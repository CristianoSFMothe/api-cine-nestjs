import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cards' })
export class Card extends BaseEntity {
  @Column({
    name: 'number_card',
    type: 'bigint',
  })
  numberCard: number;

  @Column()
  expiration: string;

  @Column({
    name: 'security_code',
    type: 'int',
  })
  securityCode: number;
}
