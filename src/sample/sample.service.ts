import { Injectable } from '@nestjs/common';
import { Fruit, SomethingReturn } from './util/something-return';

@Injectable()
export class SampleService {
  constructor(private readonly util: SomethingReturn) {}
  something() {
    const apple: Fruit.Apple = {
      name: 'Nung-gume',
      price: 2000,
      stock: 2,
    };

    const banana: Fruit.Banana = {
      name: 'Dole green',
      price: 3000,
      origin: 'Philippine',
    };

    const appleResult = this.util.something(apple);

    banana.price = (appleResult as number[])[0] * banana.price;

    const up = (this.util.something(banana) as string).toUpperCase();

    return up[0];
  }
}
