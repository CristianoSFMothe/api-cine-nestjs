import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { User } from './../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Form, Insitution } from '../entities/card.entity';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(16, { message: MessagesHelper.INCORRED_CARD_NUMBER })
  numberCard: string;

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
  limitAvailable: number;

  @ApiProperty({ enum: Object.keys(Form) })
  @IsNotEmpty()
  @IsEnum(Form)
  form: Form;

  @ApiProperty({ enum: Object.keys(Insitution) })
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
  stateCard: boolean;

  @ApiProperty()
  @IsNotEmpty()
  users: User[];
}
