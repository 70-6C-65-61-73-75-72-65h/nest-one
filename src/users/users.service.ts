import { RolesService } from './../roles/roles.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '../database/models/user.model';
import { AddRoleDTO, RemoveRoleDTO } from 'src/roles/dtos/add-role';
import { BanUserDTO } from './dtos/ban-user.dto';
import { NetworkErrors } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async checkIfUserWitHSuchEmailExists(userDTO: CreateUserDTO) {
    const candidate = await this.getUserByEmail(userDTO.email);
    if (candidate) {
      throw new HttpException(
        NetworkErrors.ACCOUNT_EXISTS,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createUser(dto: CreateUserDTO) {
    await this.checkIfUserWitHSuchEmailExists(dto);
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    });
  }
  async getUserById(id: number) {
    return await this.userRepository.findByPk(id);
  }
  async addRole({ userId: id, value }: AddRoleDTO) {
    const user = await this.getUserById(id);
    const role = await this.roleService.getRoleByValue(value);
    if (!(user || role)) {
      throw new HttpException(
        NetworkErrors.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }
    await user.$add('roles', role.id);
    return user;
  }
  async removeRole({ userId: id, value }: RemoveRoleDTO) {
    const user = await this.getUserById(id);
    const role = await this.roleService.getRoleByValue(value);
    if (!(user || role)) {
      throw new HttpException(
        NetworkErrors.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }
    await user.$remove('roles', role.id);
    return user;
  }

  async banUser({ userId: id, banReason }: BanUserDTO) {
    const user = await this.getUserById(id);
    user.isBanned = true;
    user.banReason = banReason;
    await user.save();
    return user;
  }
}
