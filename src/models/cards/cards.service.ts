import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsModel: Repository<Card>,
  ) {}
  async create(data: CreateCardDto): Promise<Card> {
    const cards = this.cardsModel.create(data);

    return await this.cardsModel.save(cards);
  }

  async show(): Promise<Card[]> {
    const cards = await this.cardsModel.find();

    if (cards.length < 1) {
      throw new NotFoundException();
    }

    return cards;
  }

  async findOne(id: string): Promise<Card> {
    const cards = await this.cardsModel.findOne({
      where: { id: id },
    });

    if (!cards) {
      throw new NotFoundException();
    }

    return cards;
  }

  async update(id: string, data: UpdateCardDto): Promise<Card> {
    const cards = await this.cardsModel.preload({
      id,
      ...data,
    });

    if (!cards) {
      throw new NotFoundException();
    }

    return await this.cardsModel.save(cards);
  }

  async remove(id: string): Promise<void> {
    const cards = await this.cardsModel.findOne({
      where: { id: id },
    });

    if (!cards) {
      throw new NotFoundException();
    }

    await this.cardsModel.softDelete(id);
  }
}
