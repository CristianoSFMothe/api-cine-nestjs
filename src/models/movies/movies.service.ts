import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from '../../common/messages/messages.helper';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Genre } from '../genre/entities/genre.entity';

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
    const movie = this.moviesRepository.create(data);

    const titleExists = await this.moviesRepository.findOne({
      title: data.title,
    });

    if (titleExists) {
      throw new NotFoundException(MessagesHelper.MOVIE_TITLE_EXISTS);
    }

    return await this.moviesRepository.save(movie);

    // const group = new Genre();
    // group.type = data.genreId;
    // group.movieId = await this.genreRepository.findByIds(data.genreId);

    // return this.moviesRepository.save(group);

    // const movie = await this.moviesRepository.findOne({
    //   relations: ['genres'],
    // });

    // const genres = [];

    // for (const genre of movie.genres) {
    //   const genreRepository = await this.genreRepository.findOne(genre.id, {
    //     relations: ['movieId'],
    //   });

    //   for (const groupGerne of genreRepository.type) {
    //     const groupGenreRepository = await this.genreRepository.findOne(
    //       groupGerne,
    //       {
    //         relations: ['items'],
    //       },
    //     );
    //     genres.push(groupGenreRepository, groupGerne);
    //   }
    // }

    // return await this.genreRepository.save(movie);
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
