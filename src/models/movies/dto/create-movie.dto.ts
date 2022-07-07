import { Genre } from '../../../common/enums/Gener-enum';
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
  genre: Genre;

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
