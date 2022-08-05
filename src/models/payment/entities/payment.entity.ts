import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from "typeorm";

export enum PaymentStatus {
  Sucesso = 'Sucesso',
  Falha = 'Falha',
}

export enum Status {
  EmAnalise = 'EmAnalise',
  Autorizado = 'Autorizado',
  Iniciado = 'Iniciado',
  Cancelado = 'Cancelado',
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
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Column({
    name: 'total_paid',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPaid: number;

  @Column({
    type: 'text'
  })
  message: string;
}
