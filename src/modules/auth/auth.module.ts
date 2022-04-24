import { UserEntity } from './../user/src/domain/entities/user.entity';
import { LoginController } from './src/infrastructure/controllers/v1/login/login.controller';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './src/application/login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'little_secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [],
})
export class AuthModule {}
