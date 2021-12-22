import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from '../database/models/roles.model';
import { NetworkErrors } from 'src/auth/constants';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRpository: typeof Role) {}

  async checkIfRoleWithSuchValueExists(roleDTO: CreateRoleDTO) {
    const candidate = await this.getRoleByValue(roleDTO.value);
    if (candidate) {
      throw new HttpException(
        NetworkErrors.ROLE_EXISTS,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createRole(dto: CreateRoleDTO) {
    await this.checkIfRoleWithSuchValueExists(dto);
    return await this.roleRpository.create(dto);
  }
  async getRoleByValue(value: string) {
    return await this.roleRpository.findOne({ where: { value } });
  }
}
