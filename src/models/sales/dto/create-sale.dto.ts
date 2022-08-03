import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Combo } from './../../combos/entities/combo.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  readonly payment: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly thing: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly combos: Combo[];
}
