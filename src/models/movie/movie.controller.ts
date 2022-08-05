import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger copy';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { FindFullMovieSwagger } from './../../common/swagger/Movie/findFull-movie.swagger';
import { UpdatedMovieSwagger } from './../../common/swagger/Movie/update-movie.swagger';
import { FindByIdMovieSwagger } from './../../common/swagger/Movie/findById-movie.swagger';
import { ShowMovieSwagger } from './../../common/swagger/Movie/show-movie.swagger';
import { CreateMovieSwagger } from './../../common/swagger/Movie/create-movie.swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('Filmes')
@Controller('api/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de um filme' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Filme criado com sucesso',
    type: CreateMovieSwagger,
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listagem de todos os Filme retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de filmes',
    type: ShowMovieSwagger,
    isArray: true,
  })
  findAll(): Promise<Movie[]> {
    return this.movieService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de um filme um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um filme retornando com sucesso',
    type: FindByIdMovieSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de um filme por ID' })
  @ApiResponse({
    status: 200,
    description: 'Filme atualizado com sucesso',
    type: UpdatedMovieSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de um filme por ID' })
  @ApiResponse({ status: 204, description: 'Filme removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Filme não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.movieService.removeMovie(id);
  }

  @Get(':movieFull/:id')
  @ApiOperation({ summary: 'Filme um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um filme retornando com sucesso',
    type: FindFullMovieSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não foi encontrado.',
    type: NotFoundSwagger,
  })
  @ApiOperation({
    summary: 'Lista todas a informações de um filme especifíco por ID',
  })
  async findAllMovie(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.findMovieFull(id);
  }
}
