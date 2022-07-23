import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { Room } from './entities/room.entity';

@ApiTags('Salas')
@Controller('api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Room> {
    return this.roomService.remove(id);
  }
}
