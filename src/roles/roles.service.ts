import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from '../database/models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRpository: typeof Role) {}

  async createRole(dto: CreateRoleDTO) {
    return await this.roleRpository.create(dto);
  }
  async getRoleByValue(value: string) {
    return await this.roleRpository.findOne({ where: { value } });
  }
}
