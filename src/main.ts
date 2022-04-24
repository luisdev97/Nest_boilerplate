import { swaggerConf } from './doc.configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

/* eslint @typescript-eslint/no-var-requires: "off" */
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const API_PORT = process.env.API_PORT;

  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(API_PORT);
  console.log('API running on PORT: ', API_PORT);
}

bootstrap();
