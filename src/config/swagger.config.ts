import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export default (app: INestApplication) => {
  if (process.env['NODE_ENV'] !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('bc nest practice')
      .setDescription('hello Tikitaka')
      .setVersion('1.0.0')
      //
      .addBearerAuth() // bearer token
      .addSecurityRequirements('bearer')
      //
      .addSecurity('Api-Key', {
        // api-key
        type: 'apiKey',
        in: 'header',
        name: 'Api-Key',
      })
      .addSecurityRequirements('Api-Key')
      //
      .addServer(`http://localhost:${process.env['PORT']}`)
      .build();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, customOptions);
  }
};
