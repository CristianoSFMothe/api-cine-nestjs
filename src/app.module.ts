import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MoviesModule } from './models/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
