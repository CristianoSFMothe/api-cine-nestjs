import { Session } from './../../sessions/entities/session.entity';
import { TypeRoom } from './../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly maximumCapacity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly minimumCapacity: number;

  @ApiProperty({ enum: Object.keys(TypeRoom) })
  @IsNotEmpty()
  @IsEnum(TypeRoom)
  readonly typeRoom: TypeRoom;

  @ApiProperty()
  @IsNotEmpty()
  sessions: Session[];
}
