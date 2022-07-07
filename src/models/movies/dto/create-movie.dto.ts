import { Genre } from '../../../common/enums/Gener-enum';
import { Classification } from '../../../common/enums/Classification-enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsEnum({ isEnum: true })
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
