import { TypeMovie } from './../../../common/enums/TypeMovie-enum';
import { Room } from './../../room/entities/room.entity';
import { Genre } from './../../genre/entities/genre.entity';
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
  @JoinTable()
  genres: Genre[];

  // TODO: Trocar aqui para OneToMany
  @OneToMany(() => Room, (room: Room) => room.movies)
  @JoinColumn()
  rooms: Room[];
}
