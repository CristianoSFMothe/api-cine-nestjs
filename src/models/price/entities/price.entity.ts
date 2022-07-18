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
    name: 'full_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  fullPrice: number;
}
