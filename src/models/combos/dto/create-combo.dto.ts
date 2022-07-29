import { Item } from './../../items/entities/item.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateComboDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  items: Item[];
}
