import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'itens' })
export class Item extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}
