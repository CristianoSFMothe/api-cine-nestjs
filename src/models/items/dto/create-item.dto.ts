import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsDecimal({ locale: 'pt-BR' })
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  readonly quantity: number;
}
