<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieModule } from './models/movie/movie.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { SessionsModule } from './models/sessions/sessions.module';
import { RoomsModule } from './models/rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MovieModule, SessionsModule, RoomsModule],
=======
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
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
  controllers: [],
  providers: [],
})
export class AppModule {}
