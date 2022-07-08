import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MoviesModule } from './models/movies/movies.module';
import { PriceModule } from './models/price/price.module';
import { RoomModule } from './models/room/room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MoviesModule,
    PriceModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
