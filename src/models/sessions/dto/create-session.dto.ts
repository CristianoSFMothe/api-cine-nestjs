import { Room } from './../../room/entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  exhibition: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // roomId: RoomDto;

  // @ApiProperty()
  // @IsNotEmpty()
  // rooms: Room;

  // @ApiProperty()
  // @IsNotEmpty()
  // priceId: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // comboId: string;
}
