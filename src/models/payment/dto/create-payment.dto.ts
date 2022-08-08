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
  @IsNumber()
  totalPaid: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
