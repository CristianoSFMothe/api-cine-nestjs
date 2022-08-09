import { Payment } from './../../payment/entities/payment.entity';
import { Session } from './../../sessions/entities/session.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket extends BaseEntity {
  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Session, (session: Session) => session.ticket, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  session: Session;

  @ManyToOne(() => Payment, (payment: Payment) => payment.tickets, {
    cascade: true,
  })
  @JoinColumn({
    name: 'payment_id',
    referencedColumnName: 'id',
  })
  payment: Payment;
}
