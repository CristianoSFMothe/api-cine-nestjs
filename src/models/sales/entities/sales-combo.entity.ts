import { Combo } from '../../combos/entities/combo.entity';
import { Sale } from './sale.entity';
import { BaseEntity } from '../../../common/base/base-entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'sales_combo' })
export class SalesCombo extends BaseEntity {
  @ManyToOne(() => Sale, (sales: Sale) => sales.salesCombo, {
    cascade: true,
  })
  @JoinColumn({
    name: 'sales_id',
    referencedColumnName: 'id',
  })
  sales: Sale;

  @ManyToOne(() => Combo, (combos: Combo) => combos.salesCombo, {
    cascade: true,
  })
  @JoinColumn({
    name: 'combo_id',
    referencedColumnName: 'id',
  })
  combos: Combo;
}
