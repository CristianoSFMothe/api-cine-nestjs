import { Combo } from './../../combos/entities/combo.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  payment: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  thing: number;

  @ApiProperty()
  @IsNotEmpty()
  combos: Combo[];
}
