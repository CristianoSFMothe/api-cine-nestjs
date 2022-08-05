import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { User } from './../users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsModel: Repository<Card>,

    @InjectRepository(User)
    private readonly usersModel: Repository<User>,
  ) {}

  async create(data: CreateCardDto): Promise<Card> {
    const cards = this.cardsModel.create(data);

    const numberCardExists = await this.cardsModel.findOne({
      where: { numberCard: data.numberCard },
    });

    if (numberCardExists) {
      throw new NotFoundException(MessagesHelper.NUMBER_EXISTS);
    }

    cards.users = await this.usersModel.findByIds(data.users);

    // const validNumberCard = await this.cardsModel.find({
    //   where: { numberCard: data.numberCard },
    // });

    // if (validNumberCard.length >= 16) {
    //   throw new NotFoundException(MessagesHelper.NUMBER_CARD_SIZE);
    // }

    // const validsecurityCode = await this.cardsModel.find({
    //   where: { securityCode: data.securityCode },
    // });

    // if (validsecurityCode.length >= 3) {
    //   throw new NotFoundException(MessagesHelper.SECURITY_CODE_ERROR);
    // }

    return await this.cardsModel.save(cards);
  }

  async show(): Promise<Card[]> {
    const cards = await this.cardsModel.find({
      relations: ['users'],
    });

    if (cards.length < 1) {
      throw new NotFoundException(MessagesHelper.NUMBER_NOT_FOUND);
    }

    return cards;
  }

  async findOne(id: string): Promise<Card> {
    const cards = await this.cardsModel.findOne({
      relations: ['users'],
      where: { id: id },
    });

    if (!cards) {
      throw new NotFoundException(MessagesHelper.NUMBER_NOT_FOUND);
    }

    return cards;
  }

  async update(id: string, data: UpdateCardDto): Promise<Card> {
    const cards = await this.cardsModel.preload({
      id,
      ...data,
    });

    if (!cards) {
      throw new NotFoundException(MessagesHelper.NUMBER_NOT_FOUND);
    }

    return await this.cardsModel.save(cards);
  }

  async remove(id: string): Promise<void> {
    const cards = await this.cardsModel.findOne({
      where: { id: id },
    });

    if (!cards) {
      throw new NotFoundException(MessagesHelper.NUMBER_NOT_FOUND);
    }

    await this.cardsModel.softDelete(id);
  }
}
