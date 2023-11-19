export class CreateProductDto {
  private readonly productId: string;

  private readonly productName: string;

  constructor(productId: string, productName: string) {
    this.productId = productId;
    this.productName = productName;
  }

  getProductId() {
    return this.productId;
  }

  getProductName() {
    return this.productName;
  }
}
