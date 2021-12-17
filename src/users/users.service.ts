import { RolesService } from './../roles/roles.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '../database/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRpository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userRpository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  async getAllUsers() {
    return await this.userRpository.findAll({ include: { all: true } });
  }
  async getUserByEmail(email: string) {
    return await this.userRpository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
