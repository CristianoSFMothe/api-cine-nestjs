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
    type: 'varchar',
    length: 16
  })
  numberCard: string;

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
    nullable: false,
    default: Form.CartaoCredito,
  })
  form: Form;

  @Column({
    name: 'institution',
    type: 'enum',
    enum: Insitution,
    nullable: false,
    default: Insitution.AmericanExpress
  })
  institution: Insitution;

  @Column()
  installments: number;

  @Column({
    name: 'state_ativo',
    type: 'boolean',
    default: true,
  })
  stateActive: boolean;

  @OneToMany(() => User, (users: User) => users.card, { cascade: true })
  users: User[];
}
