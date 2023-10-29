import {Injectable} from '@nestjs/common';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
