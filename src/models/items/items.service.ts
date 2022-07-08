import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);

    const itemExists = await this.itemRepository.findOne({
      id: createItemDto.name,
    });

    if (itemExists) {
      throw new NotFoundException();
    }

    return await this.itemRepository.save(item);
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOne({ where: { id: id } });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.preload({
      id,
      ...updateItemDto,
    });

    if (!item) {
      throw new NotFoundException();
    }

    return await this.itemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.itemRepository.findOne({ where: { id: id } });

    if (!item) {
      throw new NotFoundException();
    }
    return await this.itemRepository.remove(item);
  }
}
