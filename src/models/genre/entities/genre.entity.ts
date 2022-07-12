import { Movie } from './../../movies/entities/movie.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'genre' })
export class Genre extends BaseEntity {
  @Column('text', { array: true, nullable: true })
  type?: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.genres)
  movies: Movie[];
}
