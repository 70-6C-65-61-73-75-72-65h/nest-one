import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from 'src/database/models/roles.model';
import { UserRoles } from 'src/roles/user-roles.module';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id', required: false })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'uset@gmail.com', description: 'unique email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '132323', description: 'user password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'true',
    description: 'Banned or not',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  banned: number;

  @ApiProperty({
    example: 'Swearing words',
    description: 'Ban reason',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
