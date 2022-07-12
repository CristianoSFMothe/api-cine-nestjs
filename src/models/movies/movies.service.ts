import { Genre } from './../genre/entities/genre.entity';
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

  async create(data: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();
    movie.title = data.title;
    movie.recommendation = data.recommendation;
    movie.classification = data.classification;
    movie.duration = data.duration;
    movie.description = data.description;
    
    movie.genres = await this.genreRepository.findByIds(data.genres);

    return await this.moviesRepository.save(movie);
    
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.preload({
      id,
      ...updateMovieDto,
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
}
