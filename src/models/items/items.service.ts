import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Item } from './entities/item.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemModel: Repository<Item>,
  ) {}
  async createItem(data: CreateItemDto): Promise<Item> {
    const item = this.itemModel.create(data);

    const itemExists = await this.itemModel.findOne({
      where: { id: item.id },
    });

    if (!itemExists) {
      throw new NotFoundException(MessagesHelper.ITEM_NOT_FOUND);
    }

    return await this.itemModel.save(item);
  }

  async show(): Promise<Item[]> {
    const item = await this.itemModel.find();

    if (item.length < 1) {
      throw new HttpException(
        MessagesHelper.ITEM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return item;
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemModel.findOneOrFail({ where: { id: id } });

    if (!item) {
      throw new NotFoundException(MessagesHelper.ITEM_NOT_FOUND);
    }

    return item;
  }

  async updateItem(id: string, data: UpdateItemDto): Promise<Item> {
    const item = await this.itemModel.preload({ id, ...data });

    if (!item) {
      throw new NotFoundException(MessagesHelper.ITEM_NOT_FOUND);
    }

    return await this.itemModel.save(item);
  }

  async removeItem(id: string): Promise<void> {
    const item = await this.itemModel.findOneOrFail({ where: { id: id } });

    if (!item) {
      throw new NotFoundException(MessagesHelper.ITEM_NOT_FOUND);
    }

    await this.itemModel.softDelete(id);
  }
}
