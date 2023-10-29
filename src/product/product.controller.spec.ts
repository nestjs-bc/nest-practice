import {Test, TestingModule} from '@nestjs/testing';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./entities/product.entity";

describe('ProductController', () => {
  let controller: ProductController;
  let id: number;
  let productId: string;
  let productName: string;
  let createProductDto: CreateProductDto;
  let createProductEntity: Product
  let productEntities: Product[]

  beforeEach(async () => {
    id = 1;
    productId = "0000001";
    productName = "AWD-QQW";
    createProductDto = new CreateProductDto(productId, productName);
    createProductEntity = new Product(id, createProductDto.productId, createProductDto.productName);
    productEntities = [createProductEntity];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService,
        useValue: {
          create: jest.fn().mockImplementation((createProductDto: CreateProductDto) => Promise.resolve(createProductEntity)),
          findAll: jest.fn().mockImplementation(() => Promise.resolve(productEntities)),
          findOne: jest.fn().mockImplementation((id: number) =>
            Promise.resolve(productEntities.filter(e => e.id === id)[0] || null),
          ),
        }
      },]
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product by CreateProductDto', async () => {
      await expect(controller.create(createProductDto)).resolves.toEqual(createProductEntity);
    });
  });

  describe('findAll', () => {
    it('should get an array of products', async () => {
      await expect(controller.findAll()).resolves.toEqual([createProductEntity]);
    });
  });

  describe('findOne', () => {
    it('should get a single product by exists id', async () => {
    });

    it('should get null by not exists id', async () => {
    });

    it('should get exception by not number string', async () => {
    });

  });
});
