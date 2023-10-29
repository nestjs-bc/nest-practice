import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  private readonly _id: number;

  @Column()
  private readonly _productId: string;

  @Column()
  private readonly _ProductName: string;

  get id(): number {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get ProductName(): string {
    return this._ProductName;
  }

  constructor(id: number, productId: string, ProductName: string) {
    this._id = id;
    this._productId = productId;
    this._ProductName = ProductName;
  }
}
