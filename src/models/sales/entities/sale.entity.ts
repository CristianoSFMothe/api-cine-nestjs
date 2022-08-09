import { SalesCombo } from './sales-combo.entity';
import { Column, Entity, OneToMany } from 'typeorm';
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

  @OneToMany(() => SalesCombo, (salesCombo) => salesCombo.sales, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  salesCombo: SalesCombo[];
}
