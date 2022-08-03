import { MessagesHelper } from '../../../common/helpers/messages/messages.helper';
import { Room } from './../../rooms/entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
export class CreateMovieDto {
  @ApiProperty()
  @IsString({ message: MessagesHelper.NOT_IS_STRING_VALID })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsString({ message: MessagesHelper.NOT_IS_STRING_VALID })
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly filmCast: string[];

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly direction: string[];

  @ApiProperty()
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @Max(5)
  readonly recommendation: number;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly genre: string[];

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  @IsNumber({}, { message: MessagesHelper.NOT_IS_NUMBER_VALID })
  readonly duration: number;

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly classification: string[];

  @ApiProperty()
  @IsNotEmpty({ message: MessagesHelper.NOT_EMPTY })
  readonly rooms: Room[];
}
