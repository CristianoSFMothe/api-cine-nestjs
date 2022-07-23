import { MessagesHelper } from '../../common/messages/messages.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/common/AppError/AppError';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(data: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(data);

    const genreExists = await this.genreRepository.findOne({
      where: { id: genre.id },
    });

    if (genreExists) {
      throw new AppError(MessagesHelper.GENRE_IS_EXISTING);
    }

    return await this.genreRepository.save(genre);
  }

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id: id } });

    if (!genre) {
      throw new NotFoundException();
    }

    return genre;
  }

  async update(id: string, data: UpdateGenreDto): Promise<Genre> {
    const genre = await this.genreRepository.preload({ id, ...data });

    if (!genre) {
      throw new NotFoundException();
    }

    return await this.genreRepository.save(genre);
  }

  async remove(id: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id: id } });

    if (!genre) {
      throw new NotFoundException();
    }

    return await this.genreRepository.remove(genre);
  }
}
