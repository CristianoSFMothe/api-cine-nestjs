import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'price' })
export class Price extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  halfPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  findOut: number;
}
