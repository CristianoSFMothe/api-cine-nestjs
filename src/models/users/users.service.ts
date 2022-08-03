import { MessagesHelper } from 'src/common/helpers/messages/messages.helper';
import { User } from './entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersModel: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersModel.create(data);

    const emailExists = await this.usersModel.findOne({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new NotFoundException();
    }

    const rgExists = await this.usersModel.findOne({
      where: { rg: data.rg },
    });

    if (rgExists) {
      throw new NotFoundException();
    }

    const cpfExists = await this.usersModel.findOne({
      where: { cpf: data.cpf },
    });

    if (cpfExists) {
      throw new NotFoundException();
    }

    return await this.usersModel.save(user);
  }

  async show(): Promise<User[]> {
    const user = await this.usersModel.find();

    if (user.length < 1) {
      throw new HttpException(
        MessagesHelper.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersModel.findOneOrFail({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersModel.preload({
      id,
      ...data,
    });

    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }
    return await this.usersModel.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersModel.findOneOrFail({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    await this.usersModel.softDelete(id);
  }
}
