import { Session } from './../../sessions/entities/session.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'room' })
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'maximum_capacity', type: 'int' })
  maximumCapacity: number;

  @Column({ name: 'minimum_capacity', type: 'int' })
  minimumCapacity: number;

  @ManyToOne(() => Session, (session: Session) => session.roons)
  sessions: Room;
}
