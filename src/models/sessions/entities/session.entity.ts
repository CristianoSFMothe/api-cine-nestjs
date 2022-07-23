import { Room } from './../../rooms/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  exhibition: string[];

  @ManyToOne(() => Room, (room: Room) => room.sessions)
  rooms: Room;
}
