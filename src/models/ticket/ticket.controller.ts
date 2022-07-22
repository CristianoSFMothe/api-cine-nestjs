import { Ticket } from './entities/ticket.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ingressos' )
@Controller('api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.remove(id);
  }

  @Get(':allSession/:id')
  async findAllMovie(@Param('id') id: string) {
    return this.ticketService.findAllTicket(id);
  }
}
