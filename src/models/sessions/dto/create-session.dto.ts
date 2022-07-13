import { RoomDto } from './Room.dto';
import { Movie } from './../../movies/entities/movie.entity';
import { Room } from './../../room/entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  hour: Date;

  @ApiProperty()
  @IsNotEmpty()
  exhibition: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // roomId: RoomDto;

  @ApiProperty()
  @IsNotEmpty()
  roons: Room[];

  @ApiProperty()
  @IsNotEmpty()
  priceId: string;

  @ApiProperty()
  @IsNotEmpty()
  movies: Movie[];

  @ApiProperty()
  @IsNotEmpty()
  comboId: string;
}
