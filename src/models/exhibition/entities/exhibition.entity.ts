import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exhibition' })
export class Exhibition extends BaseEntity {
  @Column()
  description: string;
}
