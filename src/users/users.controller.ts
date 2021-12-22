import { RolesGuard } from './../auth/roles.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '../database/models/user.model';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDTO, RemoveRoleDTO } from 'src/roles/dtos/add-role';
import { BanUserDTO } from './dtos/ban-user.dto';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User Creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  // @UsePipes(ValidationPipe)
  create(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({ status: 201, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role/remove')
  removeRole(@Body() dto: RemoveRoleDTO) {
    return this.usersService.removeRole(dto);
  }

  @ApiOperation({ summary: 'Add role for the user' })
  @ApiResponse({ status: 201, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes()
  @Post('/role')
  addRole(@Body() dto: AddRoleDTO) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDTO) {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({ summary: 'User Retrieving by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getOneById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @ApiOperation({ summary: 'All Users Retrieving' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.usersService.getAllUsers();
  }
}
