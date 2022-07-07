import { Column } from 'typeorm';

export class CreatePriceDto {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  halfPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  findOut: number;
}
