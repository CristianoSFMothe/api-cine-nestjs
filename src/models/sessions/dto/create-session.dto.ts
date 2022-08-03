import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly exhibition: string[];
}
