import { SalesCombo } from './../sales-combo/entities/sales-combo.entity';
import { Item } from './../items/entities/item.entity';
import { Combo } from './entities/combo.entity';
import { Module } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Combo, Item, SalesCombo])],
  controllers: [CombosController],
  providers: [CombosService],
  exports: [CombosService],
})
export class CombosModule {}
