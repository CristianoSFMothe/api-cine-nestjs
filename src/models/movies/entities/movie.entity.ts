import { Genre } from './../../genre/entities/genre.entity';
import { BaseEntity } from '../../../common/base/base-entity';
import { Classification } from '../../../common/enums/Classification-enum';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Genre, (genre: Genre) => genre.movieId, { cascade: true })
  @JoinTable()
  genres: Genre[];
}
