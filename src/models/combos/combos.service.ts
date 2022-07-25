import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Item } from './../items/entities/item.entity';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { Combo } from './entities/combo.entity';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly comboModel: Repository<Combo>,

    @InjectRepository(Item)
    private readonly itemModel: Repository<Item>,
  ) {}

  async create(data: CreateComboDto): Promise<Combo> {
    const combo = this.comboModel.create(data);

    const item = this.itemModel.create(data);

    combo.items = await this.itemModel.findByIds(data.items);

    const itemExists = await this.itemModel.findOne({
      where: { id: item.id },
    });

    if (itemExists) {
      throw new NotFoundException();
    }

    const comboSave = await this.comboModel.save(combo);

    let somatoria = 0;

    comboSave.items.forEach((item) => {
      somatoria += item.price * item.quantity;
    });

    comboSave.price = somatoria;

    return await this.comboModel.save(combo);
  }

  async show(): Promise<Combo[]> {
    const combo = await this.comboModel.find();

    if (combo.length < 1) {
      throw new HttpException(
        MessagesHelper.COMBO_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return combo;
  }

  async findOne(id: string): Promise<Combo> {
    const combo = await this.comboModel.findOne({
      where: { id: id },
      relations: ['items'],
    });

    if (!combo) {
      throw new NotFoundException();
    }

    return combo;
  }

  async update(id: string, data: UpdateComboDto): Promise<Combo> {
    const combo = await this.comboModel.preload({ id, ...data });

    if (!combo) {
      throw new NotFoundException();
    }

    return await this.comboModel.save(combo);
  }

  async remove(id: string): Promise<void> {
    const combo = await this.comboModel.findOne({ where: { id: id } });

    if (!combo) {
      throw new NotFoundException();
    }

    await this.comboModel.softDelete(id);
  }
}
