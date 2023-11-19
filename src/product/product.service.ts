import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException(`해당 제품이 없습니다: ${id}`);
    }
    await this.productsRepository.update({ id }, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException(`해당 제품이 없습니다: ${id}`);
    }
    await this.productsRepository.delete({ id });
    return product;
  }
}
