import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

    @InjectRepository(Room)
    private readonly roonsRepository: Repository<Room>,
  ) {}

  async create(data: CreateSessionDto): Promise<Session> {
    const session = this.sessionsRepository.create(data);

    session.roons = await this.roonsRepository.findByIds(data.roons);

    const sessionExists = await this.sessionsRepository.findOne({
      id: session.id,
    });

    if (sessionExists) {
      throw new NotFoundException();
    }

    return await this.sessionsRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionsRepository.find();
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id: id },
    });

    if (!session) {
      throw new NotFoundException();
    }

    return session;
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.sessionsRepository.preload({
      id,
      ...updateSessionDto,
    });

    if (!session) {
      throw new NotFoundException();
    }

    return await this.sessionsRepository.save(session);
  }

  async remove(id: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id: id },
    });

    if (!session) {
      throw new NotFoundException();
    }

    return await this.sessionsRepository.remove(session);
  }
}
