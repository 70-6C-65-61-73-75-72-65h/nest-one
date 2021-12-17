import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { UserRoles } from 'src/roles/user-roles.module';
import { User } from '../database/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => AuthModule),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
