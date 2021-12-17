import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '../database/models/user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User Creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'User Retrieving' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.usersService.getAllUsers();
  }
}
