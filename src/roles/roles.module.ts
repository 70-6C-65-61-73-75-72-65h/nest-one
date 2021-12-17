import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import { RolesController } from './roles.controller';
import { Role } from '../database/models/roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
// forwardRef(() => AuthModule)
