import { Genre } from './../../genres/entities/genre.entity';
import { TypeMovie } from './../../../common/enums/TypeMovie-enum';
import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from '../../../common/base/base-entity';
import { Classification } from '../../../common/enums/Classification-enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'movies' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  recommendation: number;

  @Column({
    type: 'enum',
    enum: Classification,
    nullable: false,
    default: Classification.free,
  })
  classification: Classification;

  @Column({
    name: 'type_movie',
    type: 'enum',
    enum: TypeMovie,
    nullable: false,
    default: TypeMovie.dubbed,
  })
  typeMovie: TypeMovie;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Genre, (genre: Genre) => genre.movies, { cascade: true })
  @JoinTable({ name: 'genres_id' })
  genres: Genre[];

  @OneToMany(() => Room, (room: Room) => room.movies, { cascade: true })
  rooms: Room[];
}
