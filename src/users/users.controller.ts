import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @ApiOperation({ summary: 'User Retrieving by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getOneById(@Param('id') id: string) {
    console.log('id');
    console.log(id);

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
