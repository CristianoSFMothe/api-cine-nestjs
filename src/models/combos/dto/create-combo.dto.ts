import { Item } from './../../items/entities/item.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateComboDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  items: Item[];
}
