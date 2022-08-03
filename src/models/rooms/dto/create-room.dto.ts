import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Session } from './../../sessions/entities/session.entity';
import { TypeRoom } from './../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString({ message: MessagesHelper.NOT_IS_STRING_VALID })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly name: string;

  @ApiProperty()
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly maximumCapacity: number;

  @ApiProperty()
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly minimumCapacity: number;

  @ApiProperty({ enum: Object.keys(TypeRoom) })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsEnum(TypeRoom)
  readonly typeRoom: TypeRoom;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  sessions: Session[];
}
