import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Session } from './../../sessions/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsString({ message: MessagesHelper.NOT_IS_STRING_VALID })
  readonly description: string;

  @ApiProperty()
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly session: Session;
}
