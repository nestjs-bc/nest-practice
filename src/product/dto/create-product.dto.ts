export class CreateProductDto {

  private readonly _productId: string;

  private readonly _productName: string;

  constructor(productId: string, productName: string) {
    this._productId = productId;
    this._productName = productName;
  }

  get productId(): string {
    return this._productId;
  }

  get productName(): string {
    return this._productName;
  }
}
