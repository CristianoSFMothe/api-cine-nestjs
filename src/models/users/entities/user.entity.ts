import { BaseEntity } from './../../../common/base/base-entity';
import { Column, Entity } from 'typeorm';

export enum Gender {
  male = 'male',
  female = 'female',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  gender: Gender;

  @Column({
    name: 'birth_date',
    type: 'varchar',
    length: 10,
  })
  birthDate: string;

  @Column({
    name: 'cell_phone',
    type: 'varchar',
    length: 14,
    default: '(00)00000-0000',
  })
  cellPhone: string;

  @Column({
    name: 'fix_phone',
    type: 'varchar',
    length: 14,
    default: '(00)0000-0000',
  })
  fixPhone: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    name: 'RG',
    type: 'bigint',
  })
  rg: number;

  @Column({
    name: 'CPF',
    type: 'bigint',
  })
  cpf: number;
}
