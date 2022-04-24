import { CreateUserController } from './src/infrastructure/controllers/v1/create-user/create-user.controller';
// import { FindUserSesrvice } from './src/application/find-user/create-user.service';
import { CreateUserService } from './src/application/create-user/create-user.service';
import { UserEntity } from './src/domain/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const controllers = [CreateUserController];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers,
  providers: [CreateUserService],
  exports: [],
})
export class UserModule {}
