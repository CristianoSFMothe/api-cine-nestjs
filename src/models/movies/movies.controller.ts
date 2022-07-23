import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Filmes')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.create(createMovieDto);
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.remove(id);
  }

  @Get(':allMovie/:id')
  async findAllMovie(@Param('id') id: string) {
    return this.moviesService.findAllMovie(id);
  }
}
