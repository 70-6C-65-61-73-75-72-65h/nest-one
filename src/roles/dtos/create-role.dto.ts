import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'admin role' })
  @IsString({ message: 'should be a string' })
  readonly value: string;
  @ApiProperty({ example: 'main admin', description: 'admin role description' })
  @IsString({ message: 'should be a string' })
  readonly description: string;
}
