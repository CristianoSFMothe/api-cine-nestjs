import { User } from './../../users/entities/user.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
    type: 'bigint',
  })
  numberCard: number;

  @Column({ default: 'dd/yy' })
  expiration: string;

  @Column({
    name: 'security_code',
    type: 'int',
  })
  securityCode: number;

  @Column({
    name: 'available_pay',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  availablePay: number;

  @Column({
    name: 'spent_pay',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  spentPay: number;

  @Column({
    name: 'form',
    type: 'enum',
    enum: Form,
  })
  form: Form;

  @Column({
    name: 'institution',
    type: 'enum',
    enum: Insitution,
  })
  institution: Insitution;

  @Column()
  installments: number;

  @OneToMany(() => User, (users: User) => users.card, { cascade: true })
  users: User[];
}
