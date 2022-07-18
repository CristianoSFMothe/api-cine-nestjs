import { Ticket } from './entities/ticket.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketReponsitory: Repository<Ticket>,
  ) {}

  async create(data: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketReponsitory.create(data);

    const tiketExists = await this.ticketReponsitory.findOne({ id: ticket.id });

    if (tiketExists) {
      throw new NotFoundException();
    }

    return await this.ticketReponsitory.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketReponsitory.find();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketReponsitory.findOne({ where: { id: id } });

    if (!ticket) {
      throw new NotFoundException();
    }
    return ticket;
  }

  async update(id: string, data: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketReponsitory.preload({ id, ...data });

    if (!ticket) {
      throw new NotFoundException();
    }

    return await this.ticketReponsitory.save(ticket);
  }

  async remove(id: string): Promise<Ticket> {
    const ticket = await this.ticketReponsitory.findOne({ where: { id: id } });

    if (!ticket) {
      throw new NotFoundException();
    }

    return await this.ticketReponsitory.remove(ticket);
  }
}
