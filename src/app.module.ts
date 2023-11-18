import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databases } from './config/databases';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { dailyRotateLogger } from './utils/logger';
import { AllCatchFilter } from './AllCatchFilter/AllCatchFilter';
import { APP_FILTER } from '@nestjs/core';
import { FilesModule } from './files/files.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { SampleModule } from './sample/sample.module';
// const defaultOptions = {
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '1q2w3e$R',
//   database: 'appreview',
//   synchronize: true,
//   autoLoadEntities: true,
// };

@Module({
  imports: [
    AuthModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        databases.mysql(configService),
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'dev' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp(),
            utilities.format.nestLike('nest-skeleton-essentials', {
              prettyPrint: true,
            }),
          ),
        }),
        dailyRotateLogger,
      ],
    }),
    ProductModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllCatchFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
