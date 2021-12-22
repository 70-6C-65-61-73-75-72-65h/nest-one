import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class BanUserDTO {
  @ApiProperty({ example: 'Swearing words', description: 'Ban reason' })
  @IsString({ message: 'banReason should be type of string' })
  readonly banReason: string;
  @ApiProperty({ example: '1', description: 'user id for ban' })
  @IsNumber({}, { message: 'userId should be type of number' })
  readonly userId: number;
}
