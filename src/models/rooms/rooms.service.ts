import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { Session } from './../sessions/entities/session.entity';
import { Room } from './entities/room.entity';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsModel: Repository<Room>,

    @InjectRepository(Session)
    private readonly sessionModel: Repository<Session>,
  ) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const room = this.roomsModel.create(data);

    room.sessions = await this.sessionModel.findByIds(data.sessions);

    const roomExists = await this.roomsModel.findOne({
      name: data.name,
    });

    if (roomExists) {
      throw new NotFoundException(MessagesHelper.ROOM_EXISTS);
    }

    return await this.roomsModel.save(room);
  }

  async show(): Promise<Room[]> {
    return await this.roomsModel.find({ relations: ['sessions'] });
  }

  async findByid(id: string): Promise<Room> {
    const room = await this.roomsModel.findOne({
      relations: ['sessions'],
      where: { id: id },
    });

    if (!room) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return room;
  }

  async update(id: string, data: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsModel.preload({ id, ...data });

    if (!room) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return await this.roomsModel.save(room);
  }

  async remove(id: string): Promise<void> {
    const room = await this.roomsModel.findOneOrFail({
      where: { id: id },
    });

    if (!room) {
      throw new HttpException(
        MessagesHelper.SESSION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.roomsModel.softDelete(id);
  }
}
