import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  private readonly id: number;

  @Column()
  private productId: string;

  @Column()
  private productName: string;

  constructor(id: number, productId: string, productName: string) {
    this.id = id;
    this.productId = productId;
    this.productName = productName;
  }
}
