/* eslint-disable @typescript-eslint/no-unused-vars */
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

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const saleEntity = new Sale();

    saleEntity.combos = [];
    saleEntity.thing = 0;
    saleEntity.price = 0;

    createSaleDto.combos.forEach((comboItem) => {
      const combo = new Combo();
      combo.id = comboItem.id;
      saleEntity.combos.push(combo);
    });

    saleEntity.payment = createSaleDto.payment;

    // return this.saleModel.create(createSaleDto);

    const sale = await this.saleModel.save(saleEntity);

    return sale;

    // return sale;

    // const sale = this.saleModel.create(createSaleDto);

    // const combo = this.comboModel.create(createSaleDto);

    // sale.combos = await this.comboModel.findByIds(createSaleDto.combos);

    // const comboExists = await this.comboModel.findOne({
    //   where: { id: combo.id },
    // });

    // if (comboExists) {
    //   throw new NotFoundException();
    // }

    // // Calculo do valor do combo
    // const saleSave = await this.saleModel.save(sale);

    // let totalSale = 0;

    // saleSave.combos.forEach((combo) => {
    //   totalSale += Number(combo.price);
    // });

    // saleSave.price = totalSale;

    // const data = await this.comboModel.findByIds(createSaleDto.combos);

    // const comb = data.reduce((acc, { id, price }: Combo) => {
    //   acc.set(id, (acc.has(id) ? acc.get(id) : 0) + Number(price));
    //   return acc;
    // }, new Map());

    // console.log(comb);

    // const thing = sale.payment - sale.price;

    // console.log(`O trocor a ser dado é R$${thing}`);

    // const soldComb = [];

    // const comb = await this.comboModel.findByIds(createSaleDto.combos);

    // let amout = 0;

    // soldComb.forEach((item) => {
    //   comb.forEach((ele) => {
    //     if (ele.id === item) {
    //       amout += ele.price;
    //     }
    //   });
    // });

    // console.log('Valor do amount é: ', amout);
    // console.log('Valor do soldComb é: ', soldComb);
    // console.log('Valor do comb é: ', comb);

    // const saveThing = await this.saleModel.save(sale);

    // const totalPrice = 0;

    // const returnThing = await this.saleModel.findByIds(createSaleDto.combos);

    // returnThing.forEach(() => {
    //   const thing = sale.payment - saleSave.price;
    //   return thing;
    // });

    // saveThing.combos.forEach((combo) => {
    //   totalPrice += combo.price * Number(combo);
    // });

    // for (let i = 0; i < combo.id.length; i++) {}

    // returnThing.push(combo.id)

    // const response = await this.saleModel.save(sale);

    // response.thing = thing;

    // return await this.saleModel.save(sale);
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
