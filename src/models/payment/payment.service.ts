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
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentModel: Repository<Payment>,

    @InjectRepository(Card)
    private readonly cardsModel: Repository<Card>,

    @InjectRepository(Ticket)
    private readonly ticketsModel: Repository<Ticket>,
  ) {}

  // TODO
  /*
  !Cenario 1:
    => Criação do pagamento
    1 - Entra na tabela Ingresso(Ticket), armazenar o preço(price) numa variável;
    2 - Entrar na tabela Cartões(Card), armazenar o limite disponivel numa variável;
    3 - Realizar o calculo do valor do Limite Disponivel - Valor do Ingresso armazenar numa variável;    
    4 - Realizar o calculo do limite disponivel do cartão - valor do pagmento;
    5 - Verificar se o cartão tem limite antes de realizar o pagamento
  */
  // TODO
  /*
  !Cenario 2:
    => Criação do pagamento
    1 - Entra na tabela Ingresso(Ticket), armazenar o preço(price) numa variável;
    2 - Entra na tabela Combos(Combos), armazenar o preço(price) numa variável;
    3 - Realizar o calculo do valor do Ingresso + Combos, armazenar numa variável;
    4 - Entrar na tabela Cartões(Card), armazenar o limite disponivel numa variável;
    5 - Realizar o calculo do limite disponivel do cartão - valor do pagmento;
    6 - Verificar se o cartão tem limite antes de realizar o pagamento
  */
  async create(data: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentModel.create(data);

    payment.cards = await this.cardsModel.findByIds(data.cards);

    payment.tickets = await this.ticketsModel.findByIds(data.tickets);

    // for (let ticket of data.tickets) {
    //   for (let card of data.cards) {
    //     let available = 0;

    //     payment.cards.forEach(async (cardLimit) => {
    //       card.limitAvailable = cardLimit.limitAvailable;

    //       console.log(
    //         '>>>>>>>>>>> LIMITE DISPONIVEL DO CARTÃO',
    //         card.limitAvailable,
    //       );

    //       payment.tickets.forEach((ticketValue) => {
    //         ticket.price;

    //         console.log('>>>>>>>>>>> PREÇO DO INGRESSO', ticket.price);
    //       });

    //       available = ticket.price - card.limitAvailable;

    //       payment.payment = available;

    //       console.log({ available });
    //     });

    //     if (card.limitAvailable < ticket.price) {
    //       throw new HttpException(
    //         `Valor do pagamento é R$ ${ticket.price} não há limite disponivel`,
    //         HttpStatus.NOT_FOUND,
    //       );
    //     }
    //   }
    // }

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

    await this.paymentModel.softDelete(id);
  }
}
