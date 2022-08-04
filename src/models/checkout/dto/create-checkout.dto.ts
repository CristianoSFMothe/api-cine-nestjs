import { Card } from './../../cards/entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Form, Insitution } from '../entities/checkout.entity';

export class CreateCheckoutDto {
  @ApiProperty()
  @IsNotEmpty()
  form: Form;

  @ApiProperty()
  @IsNotEmpty()
  institution: Insitution;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  installments: number;

  @ApiProperty()
  @IsNotEmpty()
  card: Card;
}
