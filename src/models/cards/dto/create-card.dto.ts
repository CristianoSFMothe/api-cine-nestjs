import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { User } from './../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Form, Insitution } from '../entities/card.entity';
import { Exclude } from 'class-transformer';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(16, { message: MessagesHelper.INCORRED_CARD_NUMBER })
  // @Max(16, { message: MessagesHelper.NUMBER_CARD_SIZE })
  @IsInt()
  numberCard: number;

  @ApiProperty()
  @IsNotEmpty()
  // @Max(3, { message: MessagesHelper.SECURITY_CODE_ERROR })
  @Min(3, { message: MessagesHelper.SECURITY_CODE_SIZE })
  @IsNumber()
  securityCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expiration: string;

  @ApiProperty()
  @IsNumber()
  availablePay: number;

  @ApiProperty()
  @IsNumber()
  spentPay: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Form)
  form: Form;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Insitution)
  institution: Insitution;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  installments: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  stateActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  users: User[];
}
