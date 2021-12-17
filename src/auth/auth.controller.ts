import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/user.model';
import bcrypt from 'bcryptjs';
import { bcryptSalt, NetworkErrors } from './constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDTO: CreateUserDTO) {
    return this.authService.login(userDTO);
  }

  @Post('/registration')
  async registration(@Body() userDTO: CreateUserDTO) {
    return this.authService.registration(userDTO);
  }
}
