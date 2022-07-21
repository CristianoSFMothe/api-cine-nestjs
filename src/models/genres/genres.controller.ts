import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiTags } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';

@ApiTags('Gêneros')
@Controller('api/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<Genre> {
    return this.genreService.remove(id);
  }
}
