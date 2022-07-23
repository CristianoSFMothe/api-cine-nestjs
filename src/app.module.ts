import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieModule } from './models/movie/movie.module';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
