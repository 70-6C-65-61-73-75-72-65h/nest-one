import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'admin role' })
  readonly value: string;
  @ApiProperty({ example: 'main admin', description: 'admin role description' })
  readonly description: string;
}
