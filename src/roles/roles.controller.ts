import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleSerice: RolesService) {}

  @ApiOperation({ summary: 'Role Creation' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  create(@Body() roleDTO: CreateRoleDTO) {
    return this.roleSerice.createRole(roleDTO);
  }

  @ApiOperation({ summary: 'Role Retrieving' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  getAll(@Param('value') value: string) {
    return this.roleSerice.getRoleByValue(value);
  }
}
