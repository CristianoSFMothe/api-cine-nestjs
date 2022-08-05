import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaymentStatus, Status } from "../entities/payment.entity";

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPaid: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

}
