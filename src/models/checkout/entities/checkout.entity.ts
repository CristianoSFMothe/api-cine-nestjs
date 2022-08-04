import { Card } from './../../cards/entities/card.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

@Entity({ name: 'checkout' })
export class Checkout extends BaseEntity {
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

  @OneToOne(() => Card, { cascade: true })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
