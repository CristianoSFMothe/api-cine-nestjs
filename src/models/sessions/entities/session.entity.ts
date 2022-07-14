import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity,  ManyToOne} from 'typeorm';


@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column()
  exhibition: string;

  // TODO ManyToOne 

  @ManyToOne(() => Room, (room: Room) => room.sessions)
  rooms: Room;

  // @Column()
  // priceId: string;

  // @Column()
  // comboId: string;
}
