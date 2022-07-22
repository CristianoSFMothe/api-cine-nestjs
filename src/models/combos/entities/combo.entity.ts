import { Ticket } from './../../ticket/entities/ticket.entity';
import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'combos' })
export class Combo extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Item, (item: Item) => item.itemCombo, { cascade: true })
  items: Item[];

  @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.combos)
  @JoinColumn({ name: 'ticket_id', referencedColumnName: 'id' })
  ticket: Ticket;
}
