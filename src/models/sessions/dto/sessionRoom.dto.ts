import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SessionsRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;
}
