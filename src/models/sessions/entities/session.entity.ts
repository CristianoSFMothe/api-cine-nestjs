<<<<<<< HEAD
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
=======
import { Ticket } from './../../ticket/entities/ticket.entity';
import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column()
  exhibition: string;

  @ManyToOne(() => Room, (room: Room) => room.sessions)
  @JoinColumn({ name: 'rooms_id' })
  rooms: Room;  

  // @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.session)
  // tickets: Ticket;

  // @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.sessions)
  // @JoinColumn({ name: 'ticket_id' })
  // ticket: Ticket;
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
}
