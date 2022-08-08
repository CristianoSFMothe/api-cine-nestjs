import { Ticket } from './../../tickets/entities/ticket.entity';
import { Card } from './../../cards/entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ enum: Object.keys(PaymentStatus) })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  payment: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  cards: Card[];

  @ApiProperty()
  @IsNotEmpty()
  tickets: Ticket[];
}
