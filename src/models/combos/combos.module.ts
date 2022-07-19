import { Item } from './../items/entities/item.entity';
import { Module } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from './entities/combo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Combo, Item])],
  controllers: [CombosController],
  providers: [CombosService],
  exports: [CombosService],
})
export class CombosModule {}
