import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger copy';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { UpdatedTicketSwagger } from './../../common/swagger/Ticket/update-ticket.swagger';
import { FindByIdTicketSwagger } from './../../common/swagger/Ticket/findById-ticket.swagger';
import { ShowTicketSwagger } from './../../common/swagger/Ticket/show-ticket.swagger';
import { CreateTicketSwagger } from './../../common/swagger/Ticket/create-ticket.swagger';
import { Ticket } from './entities/ticket.entity';
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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ingressos')
@Controller('api/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Ingresso de uma sessão' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Ingresso criado com sucesso',
    type: CreateTicketSwagger,
  })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de todas as ingresso retornado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Listagen um de ingresso',
    type: ShowTicketSwagger,
    isArray: true,
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ingresso um por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um ingresso retornando com sucesso',
    type: FindByIdTicketSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Ticket> {
    return this.ticketsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma ingresso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ingresso atualizado com sucesso',
    type: UpdatedTicketSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma ingresso por ID' })
  @ApiResponse({ status: 204, description: 'Ingresso removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Ingresso não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
