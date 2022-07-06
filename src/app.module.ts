import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { FilmsModule } from './models/films/films.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FilmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
