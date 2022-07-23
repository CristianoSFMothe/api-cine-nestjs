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

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieModel: Repository<Movie>,
  ) {}

  async createMovie(data: CreateMovieDto) {
    const movie = this.movieModel.create(data);

    const movieExist = await this.movieModel.findOne({
      where: { id: movie.id },
    });

    if (movieExist) {
      throw new NotFoundException();
    }

    return await this.movieModel.save(movie);
  }

  async show() {
    const movie = await this.movieModel.find();

    if (movie.length < 1) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return await this.movieModel.find();
  }

  async findById(id: string) {
    const movie = await this.movieModel.findOneOrFail({
      where: { id: id },
    });

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  async updateMovie(id: string, data: UpdateMovieDto) {
    const movie = await this.movieModel.preload({
      id,
      ...data,
    });

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return await this.movieModel.save(movie);
  }

  async removeMovie(id: string) {
    const movie = await this.movieModel.findOneOrFail(id);

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    await this.movieModel.softDelete(id);
  }
}
