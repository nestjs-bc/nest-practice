import { Injectable } from '@nestjs/common';

export namespace Fruit {
  export type Apple = {
    name: string;
    price: number;
    stock: number;
  };

  export type Banana = {
    name: string;
    price: number;
    origin: string;
  };
}

@Injectable()
export class SomethingReturn {
  something(fruit: Fruit.Apple | Fruit.Banana) {
    if (Object.keys(fruit).includes('origin'))
      return `BANANA from ${(fruit as Fruit.Banana).origin} is now selling ${
        fruit.price
      }`;
    return [(fruit as Fruit.Apple).stock, 1, 1];
  }
}
