import { Payment } from './../../payment/entities/payment.entity';
import { User } from './../../users/entities/user.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum Form {
  CartaoCredito = 'CartaoCredito',
  DebitoBancario = 'DebitoBancario',
}

export enum Insitution {
  AmericanExpress = 'AmericanExpress',
  Diners = 'Diners',
  Mastercard = 'Mastercard',
  Hipercard = 'Hipercard',
  Hiper = 'Hiper',
  Elo = 'Elo',
  Visa = 'Visa',
}
@Entity({ name: 'cards' })
export class Card extends BaseEntity {
  @Column({
    name: 'number_card',
    type: 'varchar',
    length: 16,
  })
  numberCard: string;

  @Column({
    name: 'security_code',
    type: 'int',
  })
  securityCode: number;

  @Column({
    name: 'expiration',
    type: 'varchar',
    default: 'dd/yy',
  })
  expiration: string;

  @Column({
    name: 'limit_available',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  limitAvailable: number;

  @Column({
    //payAvailable = valor para pagar
    name: 'amount_payment',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amountPayment: number;

  @Column({
    name: 'form',
    type: 'enum',
    enum: Form,
    nullable: false,
    default: Form.CartaoCredito,
  })
  form: Form;

  @Column({
    name: 'institution',
    type: 'enum',
    enum: Insitution,
    nullable: false,
    default: Insitution.AmericanExpress,
  })
  institution: Insitution;

  @Column({
    name: 'installments',
    type: 'int',
  })
  installments: number;

  @Column({
    name: 'state_card',
    type: 'boolean',
    default: true,
  })
  stateCard: boolean;

  @OneToMany(() => User, (users: User) => users.card, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  users: User[];

  @ManyToOne(() => Payment, (payment: Payment) => payment.cards, {
    cascade: true,
  })
  @JoinColumn({
    name: 'payment_id',
    referencedColumnName: 'id',
  })
  payment: Payment;
}
