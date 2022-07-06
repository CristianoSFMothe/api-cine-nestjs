import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return await this.filmsRepository.find();
  }

  async findOne(id: string): Promise<Film> {
    const films = await this.filmsRepository.findOne({ where: { id: id } });

    if (!films) {
      throw new NotFoundException();
    }

    return films;
  }

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const films = await this.filmsRepository.create(createFilmDto);

    const titleExists = await this.filmsRepository.findOne({
      title: createFilmDto.title,
    });

    if (titleExists) {
      throw new NotFoundException();
    }

    return await this.filmsRepository.save(films);
  }

  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const films = await this.filmsRepository.preload({ id, ...updateFilmDto });

    if (!films) {
      throw new NotFoundException();
    }

    return await this.filmsRepository.save(films);
  }

  async remove(id: string): Promise<Film> {
    const films = await this.filmsRepository.findOne({ where: { id: id } });

    if (!films) {
      throw new NotFoundException();
    }

    return await this.filmsRepository.remove(films);
  }
}
