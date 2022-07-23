import { Combo } from './../../combos/entities/combo.entity';
import { Session } from './../../sessions/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  session: Session;

  @ApiProperty()
  @IsNotEmpty()
  combos: Combo[];
}
