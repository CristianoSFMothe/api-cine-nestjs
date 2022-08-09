import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { User } from './../users/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    cards.users = await this.usersModel.findByIds(data.users);

    // const userExists = await this.usersModel.findOne({
    //   where: { id: data.users },
    // });

    // if (userExists) {
    //   throw new HttpException('Usuário não existe', HttpStatus.NOT_FOUND);
    // }

    const numberCardExists = await this.cardsModel.findOne({
      where: { numberCard: data.numberCard },
    });

    if (numberCardExists) {
      throw new HttpException(
        MessagesHelper.NUMBER_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

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
