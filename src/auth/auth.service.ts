import * as bcrypt from 'bcryptjs';
import {
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { bcryptSalt, NetworkErrors } from './constants';
import { User } from 'src/database/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(userDTO: CreateUserDTO) {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }

  async registration(userDTO: CreateUserDTO) {
    await this.usersService.checkIfUserWitHSuchEmailExists(userDTO);
    const hashedPassword: string = await bcrypt.hash(
      userDTO.password,
      bcryptSalt
    );

    const newUser = await this.usersService.createUser({
      ...userDTO,
      password: hashedPassword
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      password: user.password,
      roles: user.roles
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  private async validateUser(userDTO: CreateUserDTO) {
    const user = await this.usersService.getUserByEmail(userDTO.email);
    const verifiedCreds =
      user && (await bcrypt.compare(userDTO.password, user.password));
    if (verifiedCreds) return user;

    throw new UnauthorizedException({
      message: !user
        ? NetworkErrors.INVALID_EMAIL_OR_PASSWORD
        : !verifiedCreds
        ? NetworkErrors.INVALID_PASSWORD
        : ''
    });
  }
}
