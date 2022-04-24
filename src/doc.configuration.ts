import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConf = new DocumentBuilder()
  .setTitle('Contacts API')
  .setDescription('A simple API to manage your contacts')
  .setVersion('1.0')
  .addTag('contacts')
  .build();
