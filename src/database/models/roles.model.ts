import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { UserRoles } from '../../roles/user-roles.module';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id', required: false })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'role value', required: true })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'Admin role',
    description: 'role description',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
