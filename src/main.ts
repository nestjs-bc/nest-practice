import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerConfig from './config/swagger.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  swaggerConfig(app);
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`nest is listening to ${port}`);
}
bootstrap();
