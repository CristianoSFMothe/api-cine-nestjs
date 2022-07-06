import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Filmes')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  async create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return await this.filmsService.create(createFilmDto);
  }

  @Get()
  async findAll(): Promise<Film[]> {
    return await this.filmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Film> {
    return await this.filmsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<Film> {
    return await this.filmsService.update(id, updateFilmDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Film> {
    return await this.filmsService.remove(id);
  }
}
