import { Genre } from './../genres/entities/genre.entity';
import { Room } from './../room/entities/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from '../../common/messages/messages.helper';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Session } from '../sessions/entities/session.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,

    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
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

  async create(data: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(data);

    const movieExists = await this.moviesRepository.findOne({ id: movie.id });

    if (movieExists) {
      throw new NotFoundException(MessagesHelper.MOVIE_EXISTS);
    }

    movie.genres = await this.genreRepository.findByIds(data.genres);

    movie.rooms = await this.roomsRepository.findByIds(data.rooms);

    return await this.moviesRepository.save(movie);
  }

  async update(id: string, data: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.preload({
      id,
      ...data,
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

  async findAllMovie(id: string) {
    const movie = await this.moviesRepository.findOne(id, {
      relations: ['genres'],
    });

    const room = [];

    const roomsRepository = await this.roomsRepository.find({
      relations: ['sessions'],
      where : { movies: movie.id }
    });

    room.push(roomsRepository);

    return {
      movie: {
        id: movie.id,
        title: movie.title,
        recommendation: movie.recommendation,
        classification: movie.classification,
        typeMovie: movie.typeMovie,
        duration: movie.duration,
        description: movie.description,
        genres: movie.genres,
        room: room,
      },
    };
  }
}
