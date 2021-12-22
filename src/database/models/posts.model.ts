import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { User } from './user.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id', required: false })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'uset@gmail.com', description: 'unique post title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  title: string;

  @ApiProperty({ example: '132323', description: 'post content' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content: string;

  @ApiProperty({
    example: '<______0______0______>',
    description: 'image',
    required: false
  })
  @Column({
    type: DataType.STRING
  })
  image: string;

  @ApiProperty({
    example: '1',
    description: 'user id'
  })
  @Column({
    type: DataType.INTEGER
  })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
