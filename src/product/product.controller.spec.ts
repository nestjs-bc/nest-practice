import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { createMock } from '@golevelup/ts-jest';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  let id: number;
  let productId: string;
  let productName: string;
  let createProductDto: CreateProductDto;
  let createProductEntity: Product;
  let productEntities: Product[];

  beforeEach(async () => {
    id = 1;
    productId = '0000001';
    productName = 'AWD-QQW';
    createProductDto = new CreateProductDto(productId, productName);
    createProductEntity = new Product(
      id,
      createProductDto.productId,
      createProductDto.productName,
    );
    productEntities = [createProductEntity];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product by CreateProductDto', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(
          async (createProductDto: CreateProductDto) => createProductEntity,
        );
      await expect(controller.create(createProductDto)).resolves.toEqual(
        createProductEntity,
      );
      expect(createSpy).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should get an array of products', async () => {
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => productEntities);
      await expect(controller.findAll()).resolves.toEqual([
        createProductEntity,
      ]);
      expect(findAllSpy).toHaveBeenCalledWith();
      expect(service.findAll).toBeCalledTimes(1);
    });
  });
});
