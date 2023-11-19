import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databases } from '../src/config/databases';
import { ProductModule } from '../src/product/product.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.test`,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            databases.mysql(configService),
        }),
        ProductModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('ProductModule E2E 테스트', () => {
    const api = '/product';
    const createBody = {
      productId: 'P1',
      productName: '제품1',
    };
    let id = 0;
    let updateBody = {
      productId: 'P2',
      productName: '제품2',
    };

    it('ProductModule - 1. 제품 생성 테스트', async () => {
      const data = await request(app.getHttpServer())
        .post(api)
        .send(createBody)
        .expect(201);

      id = data.body.id;
      createBody['id'] = id;
      updateBody['id'] = id;

      expect(data.body).toEqual(createBody);
    });

    it('ProductModule - 2. 제품 목록 조회 테스트', async () => {
      const products = await request(app.getHttpServer()).get(api).expect(200);
      expect(products.body).toEqual(expect.any(Array));
      expect(products.body.length).toBe(1);
      expect(products.body[0]).toEqual(createBody);
    });

    it('ProductModule - 3. 제품 상세 조회 테스트', async () => {
      const product = await request(app.getHttpServer())
        .get(`${api}/${id}`)
        .expect(200);
      expect(product.body).toEqual(createBody);
    });

    it('ProductModule - 4. 제품 수정 테스트', async () => {
      const product = await request(app.getHttpServer())
        .patch(`${api}/${id}`)
        .send(updateBody)
        .expect(200);
      expect(product.body).toEqual(updateBody);
      const updatedProduct = await request(app.getHttpServer())
        .get(`${api}/${id}`)
        .expect(200);
      expect(updatedProduct.body).toEqual(product.body);
    });

    it('ProductModule - 5. 제품 삭제 테스트', async () => {
      await request(app.getHttpServer()).delete(`${api}/${id}`).expect(200);
      const product = await request(app.getHttpServer())
        .get(`${api}/${id}`)
        .expect(200);
      expect(product.body.toBeNull);
    });
  });
});
