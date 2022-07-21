import { Genre } from './../../genres/entities/genre.entity';
import { TypeMovie } from './../../../common/enums/TypeMovie-enum';
import { Room } from './../../room/entities/room.entity';
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
  
  @ApiProperty({ enum: Object.keys(Classification)})
  @IsNotEmpty()
  classification: Classification;

  @ApiProperty({ enum: Object.keys(TypeMovie)})
  @IsNotEmpty()
  typeMovie: TypeMovie;
  
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

  @ApiProperty()
  @IsNotEmpty()
  rooms: Room[];
}
