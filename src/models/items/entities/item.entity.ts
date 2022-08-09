import { Combo } from './../../combos/entities/combo.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Combo, (combo: Combo) => combo.items, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'combo_id',
    referencedColumnName: 'id',
  })
  itemCombo: Combo;
}
