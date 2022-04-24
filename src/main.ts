import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const API_PORT = process.env.API_PORT;

  const config = new DocumentBuilder()
    .setTitle('Contacts API')
    .setDescription('A simple API to manage your contacts')
    .setVersion('1.0')
    .addTag('contacts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(API_PORT);
  console.log('API running on PORT: ', API_PORT);
}

bootstrap();
