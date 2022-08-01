import { Combo } from '../../combos/entities/combo.entity';
import { Sale } from './sale.entity';
import { BaseEntity } from '../../../common/base/base-entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'sales_combo' })
export class SalesCombo extends BaseEntity {
  @ManyToOne(() => Sale, (sales: Sale) => sales.salesCombo)
  sales: Sale;

  @ManyToOne(() => Combo, (combos: Combo) => combos.salesCombo)
  combos: Combo;
}
