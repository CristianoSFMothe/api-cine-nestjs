import { Classification } from '../../../common/enums/Classification-enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Genre } from '../entities/genre.entity';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  genres: string[];

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
}
