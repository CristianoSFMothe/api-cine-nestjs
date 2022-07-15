import { TypeRoom } from './../../../common/enums/TypeRoom-enum';
import { Session } from './../../sessions/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  maximumCapacity: number;

  @ApiProperty()
  @IsNumber()
  minimumCapacity: number;

  @ApiProperty({ enum: Object.keys(TypeRoom) })
  @IsNotEmpty()
  typeRoom: TypeRoom;

  @ApiProperty()
  @IsNotEmpty()
  sessions: Session[];
}
