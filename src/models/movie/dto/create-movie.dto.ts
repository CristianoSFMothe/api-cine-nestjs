import { TypeMovie } from './../../../common/enum/type-movie.enum';
import { Classification } from './../../../common/enum/classification.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly filmCast: string[];

  @ApiProperty()
  @IsNotEmpty()
  readonly direction: string[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Max(5)
  readonly recommendation: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly genre: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly classification: string[];
}
