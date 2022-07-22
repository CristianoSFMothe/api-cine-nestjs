import { Session } from './../../sessions/entities/session.entity';
import { Combo } from './../../combos/entities/combo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './../../../common/base/base-entity';
@Entity({ name: 'ticket' })
export class Ticket extends BaseEntity {
  @Column()
  description: string;

  @OneToOne(() => Session, {
    cascade: true,
  })
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  // @OneToMany(() => Session, (session: Session) => session.ticket, { cascade: true })
  // sessions: Session[];

  @OneToMany(() => Combo, (combo: Combo) => combo.ticket, { cascade: true })
  combos: Combo[];
}
