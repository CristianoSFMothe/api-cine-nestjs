import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly homeAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly homeNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly zipCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly district: string;

  @ApiProperty()
  @IsString()
  readonly complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly uf: string;
}
