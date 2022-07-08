import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  maximumCapacity: number;

  @ApiProperty()
  @IsNumber()
  minimumCapacity: number;
}
