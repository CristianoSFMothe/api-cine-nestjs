import { MessagesHelper } from './../../common/messages/messages.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    const price = this.priceRepository.create(createPriceDto);

    return await this.priceRepository.save(price);
  }

  async findAll() {
    return await this.priceRepository.find();
  }

  async findOne(id: string) {
    const price = await this.priceRepository.findOne({ where: { id: id } });

    if (!price) {
      throw new NotFoundException(MessagesHelper.PRICE_NOT_FOUND);
    }

    return price;
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    const price = await this.priceRepository.preload({
      id,
      ...updatePriceDto,
    });

    if (!price) {
      throw new NotFoundException(MessagesHelper.PRICE_NOT_FOUND);
    }

    return await this.priceRepository.save(price);
  }

  async remove(id: string) {
    const price = await this.priceRepository.findOne({ where: { id: id } });

    if (!price) {
      throw new NotFoundException(MessagesHelper.PRICE_NOT_FOUND);
    }

    return await this.priceRepository.remove(price);
  }
}
