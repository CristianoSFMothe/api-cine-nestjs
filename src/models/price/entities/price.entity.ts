import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'price' })
export class Price extends BaseEntity {
  @Column({
    name: 'half_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  halfPrice: number;

  @Column({
    name: 'entire_entryt',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  entireEntry: number;
}
