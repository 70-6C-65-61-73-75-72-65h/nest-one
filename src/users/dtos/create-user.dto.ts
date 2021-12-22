import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'uset@gmail.com', description: 'unique email' })
  @IsString({ message: 'Should be string type' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;
  @ApiProperty({ example: '132323', description: 'user password' })
  @IsString({ message: 'Should be string type' })
  @Length(3, 16, { message: 'Should be less than 16 and more than 3' })
  readonly password: string;
}
