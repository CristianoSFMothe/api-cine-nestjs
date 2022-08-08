import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Card } from './../cards/entities/card.entity';
import { Payment } from './entities/payment.entity';
import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentModel: Repository<Payment>,

    @InjectRepository(Card)
    private readonly cartModel: Repository<Card>,
  ) {}

  async create(data: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentModel.create(data);

    // const card = this.cartModel.create(data)

    return await this.paymentModel.save(payment);
  }

  async show(): Promise<Payment[]> {
    const payment = await this.paymentModel.find();

    if (payment.length < 1) {
      throw new HttpException(
        MessagesHelper.PAYMENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return payment;
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findOneOrFail({
      where: { id: id },
    });

    if (!payment) {
      throw new NotFoundException(MessagesHelper.PAYMENT_NOT_FOUND);
    }

    return payment;
  }

  async update(id: string, data: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.preload({
      id,
      ...data,
    });

    if (!payment) {
      throw new NotFoundException(MessagesHelper.PAYMENT_NOT_FOUND);
    }

    return await this.paymentModel.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.paymentModel.findOneOrFail({
      where: { id: id },
    });

    if (!payment) {
      throw new NotFoundException(MessagesHelper.PAYMENT_NOT_FOUND);
    }

    await this.cartModel.softDelete(id);
  }
}
