import { Combo } from './../../combos/entities/combo.entity';
import { Sale } from './../../sales/entities/sale.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'sales_combo' })
export class SalesCombo extends BaseEntity {
  @ManyToOne(() => Sale, (sales: Sale) => sales.salesCombo)
  sales: Sale;

  @ManyToOne(() => Combo, (combos: Combo) => combos.salesCobo)
  combo: Combo;
}
