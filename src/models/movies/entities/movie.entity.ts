import { BaseEntity } from '../../../common/base/base-entity';
import { Genre } from '../../../common/enums/Gener-enum';
import { Classification } from '../../../common/enums/Classification-enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({
    type: 'enum',
    enum: Genre,
    nullable: false,
    default: Genre.acao,
  })
  genre: Genre;

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
}
