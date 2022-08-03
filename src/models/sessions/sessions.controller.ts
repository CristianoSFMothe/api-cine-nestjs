import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { UpdatedSessionSwagger } from './../../common/swagger/Session/update-session.swagger';
import { FindByIdSessionSwagger } from './../../common/swagger/Session/findById-session.swagger';
import { ShowSessionSwagger } from './../../common/swagger/Session/show-session.swagger';
import { CreateSessionSwagger } from './../../common/swagger/Session/create-session.swagger';
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
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session } from './entities/session.entity';

@ApiTags('Sessões')
@Controller('api/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de uma sessão' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Sessão criado com sucesso',
    type: CreateSessionSwagger,
  })
  create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as sessões retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões',
    type: ShowSessionSwagger,
    isArray: true,
  })
  findAll(): Promise<Session[]> {
    return this.sessionsService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Sessão um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um sessão retornando com sucesso',
    type: FindByIdSessionSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sessão não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Session> {
    return this.sessionsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma sessão por ID' })
  @ApiResponse({
    status: 200,
    description: 'Sessão atualizado com sucesso',
    type: UpdatedSessionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sessão não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma Sessão por ID' })
  @ApiResponse({ status: 204, description: 'Sesão removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Sesão não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.sessionsService.remove(id);
  }
}
