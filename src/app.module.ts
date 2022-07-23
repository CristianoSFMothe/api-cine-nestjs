import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieModule } from './models/movie/movie.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { SessionsModule } from './models/sessions/sessions.module';
import { RoomsModule } from './models/rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MovieModule, SessionsModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
