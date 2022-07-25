import { Room } from './../rooms/entities/room.entity';
import { Movie } from './entities/movie.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MessagesHelper } from '../../common/helpers/messages/messages.helper';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieModel: Repository<Movie>,

    @InjectRepository(Room)
    private readonly roomModel: Repository<Room>,
  ) {}

  async createMovie(data: CreateMovieDto): Promise<Movie> {
    const movie = this.movieModel.create(data);

    const movieExist = await this.movieModel.findOne({
      where: { id: movie.id },
    });

    if (movieExist) {
      throw new NotFoundException(MessagesHelper.MOVIE_EXISTS);
    }

    movie.rooms = await this.roomModel.findByIds(data.rooms);

    return await this.movieModel.save(movie);
  }

  async show(): Promise<Movie[]> {
    const movie = await this.movieModel.find();

    if (movie.length < 1) {
      throw new HttpException(
        MessagesHelper.MOVIE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return movie;
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.movieModel.findOneOrFail({
      where: { id: id },
    });

    if (!movie) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return movie;
  }

  async updateMovie(id: string, data: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieModel.preload({
      id,
      ...data,
    });

    if (!movie) {
      throw new HttpException(
        MessagesHelper.MOVIE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.movieModel.save(movie);
  }

  async removeMovie(id: string): Promise<void> {
    const movie = await this.movieModel.findOneOrFail({ where: { id: id } });

    if (!movie) {
      throw new HttpException(
        MessagesHelper.MOVIE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.movieModel.softDelete(id);
  }

  async findMovieFull(id: string) {
    const movie = await this.movieModel.findOneOrFail({ where: { id: id } });

    const room = [];

    const roomModel = await this.roomModel.find({
      relations: ['sessions'],
      where: { movies: movie.id },
    });

    room.push(roomModel);

    return {
      movie: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        filmCast: movie.filmCast,
        direction: movie.direction,
        recommendation: movie.recommendation,
        genre: movie.genre,
        classification: movie.classification,
        duration: movie.duration,
        room: room,
      },
    };
  }
}
