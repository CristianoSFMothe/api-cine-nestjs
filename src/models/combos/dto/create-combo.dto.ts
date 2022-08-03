import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Item } from './../../items/entities/item.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateComboDto {
  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsArray()
  readonly items: Item[];
}
