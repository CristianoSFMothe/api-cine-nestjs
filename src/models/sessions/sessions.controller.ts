import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sessão')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Session> {
    return this.sessionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Session>  {
    return this.sessionsService.remove(id);
  }
}
