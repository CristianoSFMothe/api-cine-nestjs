import { NotFoundSwagger } from '../../common/helpers/swagger/not-found.swagger copy';
import { BadRequestSwagger } from './../../common/helpers/swagger/bad-request.swagger';
import { UpdatedRoomSwagger } from '../../common/swagger/Room/update-room.swagger';
import { FindByIdRoomSwagger } from '../../common/swagger/Room/findById-room.swagger';
import { ShowRoomSwagger } from '../../common/swagger/Room/show-room.swagger';
import { CreateRoomSwagger } from './../../common/swagger/Room/create-room.swagger';
import { Room } from './entities/room.entity';
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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Salas')
@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de uma sala' })
  @ApiResponse({ status: 400, description: 'Pâramentros inválidos' })
  @ApiResponse({
    status: 201,
    description: 'Filme criado com sucesso',
    type: CreateRoomSwagger,
  })
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as Sala retornado com sucesso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Sala',
    type: ShowRoomSwagger,
    isArray: true,
  })
  findAll(): Promise<Room[]> {
    return this.roomsService.show();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Sala um item por ID' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um sala retornando com sucesso',
    type: FindByIdRoomSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sala não foi encontrado.',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Room> {
    return this.roomsService.findByid(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de uma sala por ID' })
  @ApiResponse({
    status: 200,
    description: 'Sala atualizado com sucesso',
    type: UpdatedRoomSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Pâramentros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sala não foi encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de uma sala por ID' })
  @ApiResponse({ status: 204, description: 'Sala removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Sala não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.roomsService.remove(id);
  }
}
