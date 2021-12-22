import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty({ example: 'Title', description: 'post title' })
  @IsString({ message: 'title should be type of string' })
  readonly title: string;
  @ApiProperty({ example: 'Here content', description: 'post content' })
  @IsString({ message: 'content should be type of string' })
  readonly content: string;
  // @ApiProperty({ example: '<____)____)___>', description: 'post image' })
  // @IsString({ message: 'image should be type of string' })
  // readonly image: string;
  @ApiProperty({ example: '1', description: 'post user id' })
  @IsNumber({}, { message: 'userId should be type of number' })
  readonly userId: number;
}
