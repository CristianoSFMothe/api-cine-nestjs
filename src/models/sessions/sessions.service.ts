import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { MessagesHelper } from 'src/common/messages/messages.helper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionModel: Repository<Session>,
  ) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    const session = this.sessionModel.create(data);

    const sessionExists = await this.sessionModel.findOne({
      where: { id: session.id },
    });

    if (sessionExists) {
      throw new Error(MessagesHelper.SESSION_EXISTS);
    }

    return await this.sessionModel.save(session);
  }

  async show(): Promise<Session[]> {
    const session = await this.sessionModel.find();

    if (session.length < 1) {
      throw new HttpException(
        MessagesHelper.SESSION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return session;
  }

  async findById(id: string): Promise<Session> {
    const session = await this.sessionModel.findOneOrFail({
      where: { id: id },
    });

    if (!session) {
      throw new NotAcceptableException(MessagesHelper.SESSION_NOT_FOUND);
    }
    return session;
  }

  async update(id: string, data: UpdateSessionDto): Promise<Session> {
    const session = await this.sessionModel.preload({ id, ...data });

    if (!session) {
      throw new HttpException(
        MessagesHelper.SESSION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.sessionModel.save(session);
  }

  async remove(id: string): Promise<void> {
    const session = await this.sessionModel.findOneOrFail({
      where: { id: id },
    });

    if (!session) {
      throw new HttpException(
        MessagesHelper.SESSION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.sessionModel.softDelete(id);
  }
}
