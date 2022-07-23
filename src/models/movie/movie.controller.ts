import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Filmes')
@Controller('api/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.show();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.removeMovie(id);
  }
}
