import { Column, Entity } from 'typeorm';
import { BaseEntity } from './../../../common/base/base-entity';
@Entity({ name: 'ticket'})
export class Ticket extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2})
  descont: number;

  @Column()
  description: string;

  // @Column()
  // priceId: string;

  // @Column()
  // movieId: string;
}
