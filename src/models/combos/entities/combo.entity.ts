import { Sale } from './../../sales/entities/sale.entity';
import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'combos' })
export class Combo extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => Item, (item: Item) => item.itemCombo, { cascade: true })
  items: Item[];

  @ManyToMany(() => Sale, (sale: Sale) => sale.combos)
  sales: Sale;
}
