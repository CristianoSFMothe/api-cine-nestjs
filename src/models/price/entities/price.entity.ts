import { BaseEntity } from './../../../common/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity({ name: 'price' })
export class Price extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  halfPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  findOut: number;
}
