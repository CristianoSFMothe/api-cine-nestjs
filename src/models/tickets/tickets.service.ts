import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Session } from './../sessions/entities/session.entity';
import { Ticket } from './entities/ticket.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketModel: Repository<Ticket>,

    @InjectRepository(Session)
    private readonly sessionModel: Repository<Session>,
  ) {}

  async create(data: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketModel.create(data);

    const ticketExists = await this.ticketModel.findOne({
      where: { id: ticket.id },
    });

    if (ticketExists) {
      throw new NotFoundException(MessagesHelper.TICKET_EXIST);
    }

    const sessionExists = await this.sessionModel.findOne({
      where: { id: ticket.id },
    });

    if (sessionExists) {
      throw new HttpException(
        MessagesHelper.SESSION_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.ticketModel.save(ticket);
  }

  async show(): Promise<Ticket[]> {
    const ticket = await this.ticketModel.find({ relations: ['session'] });

    if (ticket.length < 1) {
      throw new HttpException(
        MessagesHelper.TICKET_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return ticket;
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findOneOrFail({
      relations: ['session'],
      where: { id: id },
    });

    if (!ticket) {
      throw new NotFoundException(MessagesHelper.TICKET_NOT_FOUND);
    }

    return ticket;
  }

  async update(id: string, data: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketModel.preload({ id, ...data });

    if (!ticket) {
      throw new NotFoundException(MessagesHelper.TICKET_NOT_FOUND);
    }

    return await this.ticketModel.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const ticket = await this.ticketModel.findOneOrFail({ where: { id: id } });

    if (!ticket) {
      throw new NotFoundException(MessagesHelper.TICKET_NOT_FOUND);
    }

    await this.ticketModel.softDelete(id);
  }
}
