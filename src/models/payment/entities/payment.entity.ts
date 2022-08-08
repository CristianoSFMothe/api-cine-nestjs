import { Ticket } from './../../tickets/entities/ticket.entity';
import { Card } from './../../cards/entities/card.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum PaymentStatus {
  Cancelado = 'Cancelado',
  Sucesso = 'Sucesso',
  Falha = 'Falha',
}

@Entity({ name: 'payment' })
export class Payment extends BaseEntity {
  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'payment',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  payment: number;

  @Column({
    name: 'message',
    type: 'text',
  })
  message: string;

  @OneToMany(() => Card, (card: Card) => card.payment, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  cards: Card[];

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.payment, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  tickets: Ticket[];
}
