import { Item } from './../items/entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { Combo } from './entities/combo.entity';
import lodash from 'lodash';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly comboRepository: Repository<Combo>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(data: CreateComboDto): Promise<Combo> {
    const combo = this.comboRepository.create(data);

    const item = this.itemRepository.create(data);

    combo.items = await this.itemRepository.findByIds(data.items);

    const itemExists = await this.itemRepository.findOne({
      where: { id: item.id },
    });

    if (itemExists) {
      throw new NotFoundException();
    }

    const items = [];

    // const result = items
    //   .map((item) => item.price)
    //   .reduce((acc, total) => {
    //     return acc + total * item.quantity;
    //   });
    // console.log(result);

    // const items = [];

    // var total = items.reduce((item) => {
    //   return total + item.price * item.quantity;
    // });

    // console.log(total);

    // for (const item of combo.items) {
    //   const itemItem = await this.itemRepository.findOne({
    //     where: { item: item.price },
    //   });
    // }

    // items.forEach((items) => {});

    // let sum = items.reduce((accumulator, item) => accumulator + item.price, 0);

    // console.log(sum);

    let comboSave = await this.comboRepository.save(combo);

    let somatoria = 0;

    comboSave.items.forEach((item) => {
      somatoria += item.price * item.quantity;
    });

    comboSave.price = somatoria;

    return await this.comboRepository.save(combo);
  }

  async findAll(): Promise<Combo[]> {
    return await this.comboRepository.find();
  }

  async findOne(id: string): Promise<Combo> {
    const combo = await this.comboRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });

    if (!combo) {
      throw new NotFoundException();
    }

    return combo;
  }

  async update(id: string, data: UpdateComboDto): Promise<Combo> {
    const combo = await this.comboRepository.preload({ id, ...data });   

    if (!combo) {
      throw new NotFoundException();
    }

    return await this.comboRepository.save(combo);
  }

  async remove(id: string): Promise<Combo> {
    const combo = await this.comboRepository.findOne({ where: { id: id } });

    if (!combo) {
      throw new NotFoundException();
    }

    return await this.comboRepository.softRemove(combo);
  }
}
