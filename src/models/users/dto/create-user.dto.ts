import { Address } from './../../address/entities/address.entity';
import { Gender } from './../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @ApiProperty({ enum: Object.keys(Gender) })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly birthDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly cellPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fixPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly rg: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly cpf: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly address: Address[];
}
