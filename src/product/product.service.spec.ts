import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';

describe('ProductService', () => {
  let service: ProductService;
  let productsRepository: Repository<Product>;

  let id: number;
  let productId: string;
  let productName: string;
  let createProductDto: CreateProductDto;
  let createProductEntity: Product;
  let productEntities: Product[];

  const productRepositoryToken = getRepositoryToken(Product);

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
      providers: [
        ProductService,
        {
          provide: productRepositoryToken,
          useValue: createMock<Repository<Product>>(),
        },
      ],
    })
      .useMocker((token) => {
        console.log(token);
        return createMock(token);
      })
      .compile();
    service = module.get<ProductService>(ProductService);
    productsRepository = module.get<Repository<Product>>(
      productRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product by CreateProductDto', async () => {
      jest
        .spyOn(productsRepository, 'create')
        .mockImplementation(
          (createProductDto: CreateProductDto) => createProductEntity,
        );
      jest
        .spyOn(productsRepository, 'save')
        .mockImplementation(
          async (createProductEntity: Product) => createProductEntity,
        );

      await expect(service.create(createProductDto)).resolves.toEqual(
        createProductEntity,
      );
      expect(productsRepository.create).toBeCalledWith(createProductDto);
      expect(productsRepository.create).toBeCalledTimes(1);
      expect(productsRepository.save).toBeCalledWith(createProductEntity);
      expect(productsRepository.save).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should get an array of products', async () => {
      jest
        .spyOn(productsRepository, 'find')
        .mockImplementation(async () => productEntities);

      await expect(service.findAll()).resolves.toEqual(productEntities);
      expect(productsRepository.find).toHaveBeenCalledWith();
      expect(productsRepository.find).toBeCalledTimes(1);
    });
  });
});
