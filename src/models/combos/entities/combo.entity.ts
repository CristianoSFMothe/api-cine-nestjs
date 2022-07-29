import { SalesCombo } from './../../sales-combo/entities/sales-combo.entity';
// import { SalesCombo } from './../../sales/entities/sales-combo.entity';
import { Sale } from './../../sales/entities/sale.entity';
import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'combos' })
export class Combo extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Item, (item: Item) => item.itemCombo, { cascade: true })
  items: Item[];

  // @ManyToMany(() => Sale, (sale: Sale) => sale.combos)
  // sales: Sale[];

  @OneToMany(() => SalesCombo, (salesCombo) => salesCombo.combo)
  salesCobo: SalesCombo[];
}
