import { SalesCombo } from '../../sales/entities/sales-combo.entity';
import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'combos' })
export class Combo extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Item, (item: Item) => item.itemCombo, { 
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
   })
  items: Item[];

  @OneToMany(() => SalesCombo, (salesCombo) => salesCombo.combos, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  salesCombo: SalesCombo[];
}
