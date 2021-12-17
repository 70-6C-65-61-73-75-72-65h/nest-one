import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { Role } from '../database/models/roles.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
