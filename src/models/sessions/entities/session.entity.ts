import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column()
  exhibition: string;

  @ManyToOne(() => Room, (room: Room) => room.sessions)
  @JoinColumn({ name: 'rooms_id' })
  rooms: Room;
}
