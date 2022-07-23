import { BaseEntity } from './../../../common/base/base-entity';
import { Classification } from './../../../common/enum/classification.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'movie' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('json', { name: 'film_cast', nullable: false })
  filmCast: string[];

  @Column('json', { nullable: false })
  direction: string[];

  @Column({ type: 'int' })
  recommendation: number;

  @Column('json', { nullable: false })
  genre: string[];

  @Column({ type: 'int' })
  duration: number;

  @Column('json', { nullable: false })
  classification: string[];
}
