import { Room } from './../../rooms/entities/room.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'movie' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  filmCast: string[];

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  direction: string[];

  @Column({ type: 'int' })
  recommendation: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  genre: string[];

  @Column({ type: 'int' })
  duration: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  classification: string[];

  @OneToMany(() => Room, (room: Room) => room.movies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  rooms: Room[];
}
