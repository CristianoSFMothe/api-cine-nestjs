import { SalesCombo } from './sales-combo.entity';
import { Combo } from './../../combos/entities/combo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './../../../common/base/base-entity';

@Entity({ name: 'sales' })
export class Sale extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  payment: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  thing: number;

  // @ManyToMany(() => Combo, (combo: Combo) => combo.sales)
  // @JoinTable({
  //   name: 'sales_combo',
  // })
  // combos: Combo[];

  @OneToMany(() => SalesCombo, (salesCombo) => salesCombo.sales, {
    cascade: true,
  })
  salesCombo: SalesCombo[];
}
