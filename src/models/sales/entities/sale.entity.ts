import { Combo } from './../../combos/entities/combo.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './../../../common/base/base-entity';

@Entity({ name: 'sales' })
export class Sale extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  payment: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  thing: number;

  @ManyToMany(() => Combo, (combo: Combo) => combo.sales, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  combos: Combo[];
}
