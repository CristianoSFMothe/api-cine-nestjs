import { Gender } from './../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @ApiProperty({ enum: Object.keys(Gender) })
  @IsNotEmpty()
  genderType: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly birthDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly cellphone: string;

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
}
