import { Movie } from './../../movies/entities/movie.entity';
import { Room } from './../../room/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column()
  hour: Date;

  @Column()
  exhibition: string;

  @OneToMany(() => Movie, (movie: Movie) => movie.sessions)
  movies: Movie[];

  @OneToMany(() => Room, (room: Room) => room.sessions)
  roons: Room[];

  @Column()
  priceId: string;

  @Column()
  comboId: string;
}
