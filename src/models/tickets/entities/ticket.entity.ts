import { Session } from './../../sessions/entities/session.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket extends BaseEntity {
  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Session, {
    cascade: true,
  })
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;
}
