import { SalesCombo } from 'src/models/sales/entities/sales-combo.entity';
import { Combo } from './../../combos/entities/combo.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @ApiPropertyOptional()
  @IsNotEmpty()
  combos: Combo[];
}
