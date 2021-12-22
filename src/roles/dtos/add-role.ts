import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'admin role' })
  @IsString({ message: 'value should be type of string' })
  readonly value: string;
  @ApiProperty({ example: '1', description: 'user id for adding new role' })
  @IsNumber({}, { message: 'userId should be type of number' })
  readonly userId: number;
}

export class RemoveRoleDTO extends AddRoleDTO {}
