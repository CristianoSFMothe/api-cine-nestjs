import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MoviesModule } from './models/movies/movies.module';
import { PriceModule } from './models/price/price.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MoviesModule, PriceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
