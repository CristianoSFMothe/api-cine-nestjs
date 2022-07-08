import { Genre } from './entities/genre.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from '../../common/messages/messages.helper';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find({
      relations: ['genres'],
    });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({
      where: { id: id },
      relations: ['genres'],
    });

    if (!movie) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const genres = await Promise.all(
      createMovieDto.genres.map((name) => this.preloadGenreByName(name)),
    );

    const movie = this.moviesRepository.create({
      ...createMovieDto,
      genres,
    });

    const titleExists = await this.moviesRepository.findOne({
      title: createMovieDto.title,
    });

    if (titleExists) {
      throw new NotFoundException(MessagesHelper.MOVIE_TITLE_EXISTS);
    }

    return await this.moviesRepository.save(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const genres =
      updateMovieDto.genres &&
      (await Promise.all(
        updateMovieDto.genres.map((name) => this.preloadGenreByName(name)),
      ));

    const movie = await this.moviesRepository.preload({
      id,
      ...updateMovieDto,
      genres,
    });

    if (!movie) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return await this.moviesRepository.save(movie);
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id: id } });

    if (!movie) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return await this.moviesRepository.remove(movie);
  }

  // Método para verificar se já existe o gênero do filme criado
  private async preloadGenreByName(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne(name);

    if (genre) {
      return genre;
    }

    return this.genreRepository.create({ name });
  }
}
