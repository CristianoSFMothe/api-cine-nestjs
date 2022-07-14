import { Session } from './../sessions/entities/session.entity';
import { MessagesHelper } from './../../common/messages/messages.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import AppError from '../../common/AppError/AppError';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(data);

    room.sessions = await this.sessionRepository.findByIds(data.sessions);

    const roomExists = await this.roomRepository.findOne({
      name: data.name,
    });

    if (roomExists) {
      throw new AppError(MessagesHelper.ROOM_EXISTS);
    }

    return await this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({ relations: ['sessions'] });
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: id } });

    if (!room) {
      throw new NotFoundException();
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.preload({ id, ...updateRoomDto });

    if (!room) {
      throw new NotFoundException();
    }

    return await this.roomRepository.save(room);
  }

  async remove(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: id } });

    if (!room) {
      throw new NotFoundException();
    }

    return await this.roomRepository.remove(room);
  }
}
