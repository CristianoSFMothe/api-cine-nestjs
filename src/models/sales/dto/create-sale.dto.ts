import { Combo } from './../../combos/entities/combo.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  combos: Combo[];
}
