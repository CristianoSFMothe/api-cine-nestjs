import { Room } from './../../room/entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SessionsRoomDto } from './sessionRoom.dto';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty()
  @IsNotEmpty()
  exhibition: string;

  @ApiProperty()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  priceId: string;

  @ApiProperty()
  @IsNotEmpty()
  movieId: string;

  @ApiProperty()
  @IsNotEmpty()
  comboId: string;
}
