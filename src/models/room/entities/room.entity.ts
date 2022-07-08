import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'room' })
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'maximum_capacity', type: 'int' })
  maximumCapacity: number;

  @Column({ name: 'minimum_capacity', type: 'int' })
  minimumCapacity: number;
}
