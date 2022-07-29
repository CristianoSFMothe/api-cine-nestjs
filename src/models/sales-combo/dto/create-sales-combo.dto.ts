import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Combo } from './../../combos/entities/combo.entity';
import { Sale } from './../../sales/entities/sale.entity';
export class CreateSalesComboDto {
  @ApiProperty()
  @IsNotEmpty()
  sales: Sale[];

  @ApiProperty()
  @IsNotEmpty()
  combo: Combo[];
}
