import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const ENTITY_PATH = join('../', '../../*/domain/entities/*.entity.{js,ts}');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'root',
      database: 'test_db',
      entities: [ENTITY_PATH],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
