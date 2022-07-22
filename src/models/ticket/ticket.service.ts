import { Session } from './../sessions/entities/session.entity';
import { Combo } from './../combos/entities/combo.entity';
import { Ticket } from './entities/ticket.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketReponsitory: Repository<Ticket>,

    @InjectRepository(Session)
    private readonly sessionReponsitory: Repository<Session>,

    @InjectRepository(Room)
    private readonly roomReponsitory: Repository<Room>,

    @InjectRepository(Combo)
    private readonly comboReponsitory: Repository<Combo>,
  ) {}

  async create(data: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketReponsitory.create(data);

    const session = await this.sessionReponsitory.findOne();

    if (!session) {
      throw new NotFoundException();
    }

    ticket.combos = await this.comboReponsitory.findByIds(data.combos);

    const tiketExists = await this.ticketReponsitory.findOne({ id: ticket.id });

    if (tiketExists) {
      throw new NotFoundException();
    }

    return await this.ticketReponsitory.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketReponsitory.find({
      relations: ['combos', 'session'],
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketReponsitory.findOne({
      relations: ['combos', 'session'],
      where: { id: id },
    });

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

  async findAllTicket(id: string) {
    const ticket = await this.ticketReponsitory.findOne(id, {
      relations: ['combos'],
    });

    const session = [];

    const sessionReponsitory = await this.sessionReponsitory.find({
      relations: ['session'],
      where: { tickets: ticket.id },
    });

    session.push(sessionReponsitory);

    return {
      ticket: {
        id: ticket.id,
        describe: ticket.description,
        session: session,
      },
    };
  }
}
