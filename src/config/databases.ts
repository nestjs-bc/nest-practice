import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// const sqlite: TypeOrmModuleOptions = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

const mysql = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  database: configService.get('DB_DATABASE'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  port: parseInt(configService.get('DB_PORT')),
  //entities: configService.get('DB_ENTITY1'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get('DB_SYNC'),
  logging: true,
});

export const databases = {
  //   sqlite,
  mysql,
};
