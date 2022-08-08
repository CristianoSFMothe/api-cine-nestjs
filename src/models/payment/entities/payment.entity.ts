import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from "typeorm";

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
    scale: 2
  })
  payment: number;

  @Column({
    name: 'total_paid',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPaid: number;

  @Column({
    name: 'message',
    type: 'text'
  })
  message: string;
}
