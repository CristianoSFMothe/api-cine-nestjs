import { MessagesHelper } from './../../common/messages/messages.helper';
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

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);

    const genreExists = await this.genreRepository.findOne({
      type: createGenreDto.type,
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

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.genreRepository.preload({ id, ...updateGenreDto });

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
