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
  ) {}

  async create(data: CreateSaleDto): Promise<Sale> {
    const sale = this.saleModel.create(data);

    const combo = this.comboModel.create(data);

    sale.combos = await this.comboModel.findByIds(data.combos);

    const comboExists = await this.comboModel.findOne({
      where: { id: combo.id },
    });

    if (comboExists) {
      throw new NotFoundException();
    }

    const saleSave = await this.saleModel.save(sale);

    let totalSale = 0;

    saleSave.combos.forEach((combo) => {
      totalSale += combo.price * combo.quantity;
    });

    saleSave.price = totalSale;

    return await this.saleModel.save(sale);
  }

  async show(): Promise<Sale[]> {
    const sale = await this.saleModel.find();

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
      relations: ['combos'],
    });

    if (!sale) {
      throw new NotFoundException();
    }

    return sale;
  }

  async update(id: string, data: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleModel.preload({ id, ...data });

    if (!sale) {
      throw new NotFoundException();
    }

    return await this.saleModel.save(sale);
  }

  async remove(id: string): Promise<void> {
    const sale = await this.saleModel.findOne({ where: { id: id } });

    if (!sale) {
      throw new NotFoundException();
    }

    await this.saleModel.softDelete(id);
  }
}
