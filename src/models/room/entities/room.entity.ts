import { TypeRoom } from './../../../common/enums/TypeRoom-enum';

import { Movie } from './../../movies/entities/movie.entity';
import { Session } from './../../sessions/entities/session.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'room' })
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'maximum_capacity', type: 'int' })
  maximumCapacity: number;

  @Column({ name: 'minimum_capacity', type: 'int' })
  minimumCapacity: number;

  @Column({
    name: 'type_room',
    type: 'enum',
    enum: TypeRoom,
    nullable: false,
    default: TypeRoom.two_D,
  })
  typeRoom: TypeRoom;

  @OneToMany(() => Session, (session: Session) => session.rooms, {
    cascade: true,
  })
  sessions: Session[];

  @ManyToOne(() => Movie, (movie: Movie) => movie.rooms)
  @JoinColumn({ name: 'movies_id' })
  movies: Movie;
}
