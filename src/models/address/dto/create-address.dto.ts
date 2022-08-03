import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  homeAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  homeNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  zipCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uf: string;
}
