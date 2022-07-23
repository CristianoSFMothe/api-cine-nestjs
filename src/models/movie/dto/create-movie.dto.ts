import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
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
