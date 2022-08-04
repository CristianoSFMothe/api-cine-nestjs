import { Card } from './../cards/entities/card.entity';
import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Checkout } from './entities/checkout.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutModel: Repository<Checkout>,

    @InjectRepository(Card)
    private readonly cardModel: Repository<Card>,
  ) {}

  async create(data: CreateCheckoutDto): Promise<Checkout> {
    const checkout = this.checkoutModel.create(data);

    return await this.checkoutModel.save(checkout);
  }

  async show(): Promise<Checkout[]> {
    const checkout = await this.checkoutModel.find({
      relations: ['card'],
    });

    if (checkout.length < 1) {
      throw new HttpException(
        MessagesHelper.CHECKOUT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return checkout;
  }

  async findOne(id: string): Promise<Checkout> {
    const checkout = await this.checkoutModel.findOne({
      relations: ['card'],
      where: { id: id },
    });

    if (!checkout) {
      throw new NotFoundException(MessagesHelper.CHECKOUT_NOT_FOUND);
    }
    return checkout;
  }

  async update(id: string, data: UpdateCheckoutDto): Promise<Checkout> {
    const checkout = await this.checkoutModel.preload({
      id,
      ...data,
    });

    if (!checkout) {
      throw new NotFoundException(MessagesHelper.CHECKOUT_NOT_FOUND);
    }

    return checkout;
  }

  async remove(id: string): Promise<void> {
    const checkout = await this.checkoutModel.findOne({
      where: { id: id },
    });

    if (!checkout) {
      throw new NotFoundException(MessagesHelper.CHECKOUT_NOT_FOUND);
    }

    await this.checkoutModel.softDelete(id);
  }
}
