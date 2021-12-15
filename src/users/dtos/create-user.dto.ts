import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'uset@gmail.com', description: 'unique email' })
  readonly email: string;
  @ApiProperty({ example: '132323', description: 'user password' })
  readonly password: string;
}
