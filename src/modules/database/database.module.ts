import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmAsyncConfig } from '../../configuration/database.conf';

const ENTITY_PATH = join(
  __dirname,
  '../**/src/domain/entities/*.entity.{js,ts}',
);

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
})
export class DatabaseModule {}
