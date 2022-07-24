import { Movie } from './../../movie/entities/movie.entity';
import { Session } from './../../sessions/entities/session.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum TypeRoom {
  TWO_D = 'TWO_D',
  THREE_D = 'THREE_D',
}

@Entity({ name: 'rooms' })
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
    default: TypeRoom.TWO_D,
  })
  typeRoom: TypeRoom;

  @OneToMany(() => Session, (session: Session) => session.rooms, {
    cascade: true,
  })
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  sessions: Session[];

  @ManyToOne(() => Movie, (movie: Movie) => movie.rooms, { cascade: true })
  @JoinColumn({ name: 'movie_id' })
  movies: Movie;
}
