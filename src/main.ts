import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const API_PORT = process.env.API_PORT;
  await app.listen(API_PORT);
  console.log('API running on PORT: ', API_PORT);
}

bootstrap();
