import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsNotEmpty()
  halfPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  findOut: number;
}
