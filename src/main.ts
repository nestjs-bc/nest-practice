import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 3052;
  await app.listen(port);
  console.log(`nest is listening to ${port}`);
}
bootstrap();
