import { GenreModule } from './models/genres/genres.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MoviesModule } from './models/movies/movies.module';
import { RoomModule } from './models/room/room.module';
import { ItemsModule } from './models/items/items.module';
import { CombosModule } from './models/combos/combos.module';
import { SessionsModule } from './models/sessions/sessions.module';
import { TicketModule } from './models/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MoviesModule,
    RoomModule,
    ItemsModule,
    CombosModule,
    SessionsModule,
    GenreModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
