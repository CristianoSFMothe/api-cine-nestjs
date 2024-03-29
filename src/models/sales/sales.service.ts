import { SalesCombo } from 'src/models/sales/entities/sales-combo.entity';
import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Combo } from './../combos/entities/combo.entity';
import { Sale } from './entities/sale.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleModel: Repository<Sale>,

    @InjectRepository(Combo)
    private readonly comboModel: Repository<Combo>,

    @InjectRepository(SalesCombo)
    private readonly salesComboModel: Repository<SalesCombo>,
  ) {}

  async create(data: CreateSaleDto): Promise<Sale> {
    const sale = this.saleModel.create(data);

    const combos = this.comboModel.create(data);

    const saleModel = await this.saleModel.save(sale);

    const saleEntity = new Sale();

    saleEntity.salesCombo = [];    

    saleEntity.thing = 0;

    saleEntity.price = 0;

    for (let i = 0; i < data.combos.length; i++) {
      const comboItem: Combo = data.combos[i];

      const salesCombo = new SalesCombo();

      salesCombo.combos = comboItem;

      salesCombo.sales = saleModel;

      const salesCombos = this.salesComboModel.create(salesCombo);

      await this.salesComboModel.save(salesCombos);
    }

    const salesComboModel = await this.salesComboModel.find({
      relations: ['combos'],
      where: { sales: { id: saleModel.id } },
    });

    const comboExists = await this.comboModel.findOne({
      where: { id: combos.id },
    });

    if (comboExists) {
      throw new NotFoundException(MessagesHelper.COMBO_NOT_FOUND);
    }

    const saleSave = await this.saleModel.save(sale);

    let combosSold = 0;

    salesComboModel.forEach((sales) => {
      combosSold += Number(sales.combos.price);
    });

    saleSave.price = combosSold;

    const returnThing = await this.saleModel.save(sale);

    const thing = sale.payment - saleSave.price;

    if (sale.payment < saleSave.price) {
      throw new NotFoundException(
        `O valor pago R$ ${sale.payment.toFixed(
          2,
        )} é menor que o valor consumido R$ ${saleSave.price.toFixed(2)}`,
      );
    }

    returnThing.thing = thing;

    return await this.saleModel.save(sale);
  }

  async show(): Promise<Sale[]> {
    const sale = await this.saleModel.find({
      relations: ['salesCombo'],
    });

    if (SalesService.length < 1) {
      throw new HttpException(
        MessagesHelper.SALE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return sale;
  }

  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleModel.findOne({
      where: { id: id },
      relations: ['salesCombo'],
    });

    if (!sale) {
      throw new NotFoundException(MessagesHelper.SALE_NOT_FOUND);
    }

    return sale;
  }

  async update(id: string, data: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleModel.preload({ id, ...data });

    if (!sale) {
      throw new NotFoundException(MessagesHelper.COMBO_NOT_FOUND);
    }

    return await this.saleModel.save(sale);
  }

  async remove(id: string): Promise<void> {
    const sale = await this.saleModel.findOne({ where: { id: id } });

    if (!sale) {
      throw new NotFoundException(MessagesHelper.COMBO_NOT_FOUND);
    }

    await this.saleModel.softDelete(id);
  }
}
