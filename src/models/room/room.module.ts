import { Session } from './../sessions/entities/session.entity';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Session])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
