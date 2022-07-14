import { Room } from './../../room/entities/room.entity';
import { Session } from './../../sessions/entities/session.entity';
import { Genre } from './../../genre/entities/genre.entity';
import { Classification } from '../../../common/enums/Classification-enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recommendation: number;
  
  @ApiProperty()
  @IsNotEmpty()
  classification: Classification;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  genres: Genre[];

  // @ApiProperty()
  // @IsNotEmpty()
  // sessions: Session[];

  @ApiProperty()
  @IsNotEmpty()
  rooms: Room[];
}
