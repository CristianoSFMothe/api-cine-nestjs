import { Movie } from './../../movies/entities/movie.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre extends BaseEntity {
  @Column()
  type: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.genres)
  movies: Movie[];
}
