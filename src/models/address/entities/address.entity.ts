import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @Column({ name: 'home_address', type: 'varchar' })
  homeAddress: string;

  @Column({ name: 'home_number', type: 'varchar' })
  homeNumber: string;

  @Column({ name: 'zip_code', type: 'integer' })
  zipCode: number;

  @Column({ name: 'district', type: 'varchar' })
  district: string;

  @Column({ name: 'complement', type: 'varchar' })
  complement: string;

  @Column({ name: 'city', type: 'varchar' })
  city: string;

  @Column({ name: 'UF' })
  uf: string;
}
