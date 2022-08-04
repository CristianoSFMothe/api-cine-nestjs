import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(12)
  numberCard: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expiration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(3)
  securityCode: number;
}
