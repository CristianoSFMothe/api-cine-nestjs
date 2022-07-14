import { Room } from './../../room/entities/room.entity';
import { Session } from './../../sessions/entities/session.entity';
import { Genre } from './../../genre/entities/genre.entity';
import { BaseEntity } from '../../../common/base/base-entity';
import { Classification } from '../../../common/enums/Classification-enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
    default: Classification.livre,
  })
  classification: Classification;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Genre, (genre: Genre) => genre.movies, { cascade: true })
  @JoinTable()
  genres: Genre[];

  // TODO: Trocar aqui para OneToMany

  // @ManyToOne(() => Session, (session: Session)=> session.movies)
  // @JoinTable()
  // sessions: Session[];

  @OneToMany(() => Room, (room: Room) => room.movies)
  rooms: Room[];
}
