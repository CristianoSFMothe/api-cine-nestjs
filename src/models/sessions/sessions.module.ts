import { Movie } from './../movies/entities/movie.entity';
import { Room } from './../room/entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Room, Movie])],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
