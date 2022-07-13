import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';
import { SessionsRoomDto } from '../dto/sessionRoom.dto';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column()
  hour: Date;

  @Column()
  exhibition: string;
  
  @Column()
  movieId: string;

  @Column()
  roomId: string;

  @Column()
  priceId: string;


  @Column()
  comboId: string;
}
