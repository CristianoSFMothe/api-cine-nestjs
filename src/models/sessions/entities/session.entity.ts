import { Ticket } from './../../tickets/entities/ticket.entity';
import { Room } from './../../rooms/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  exhibition: string[];

  @ManyToOne(() => Room, (room: Room) => room.sessions, {
    cascade: true,
  })
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'id',
  })
  rooms: Room;
  
  @OneToOne(() => Ticket, (ticket: Ticket) => ticket.session, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'ticket_id',
    referencedColumnName: 'id',
  })
  ticket: Ticket;
}
