import { JwtStrategy } from './src/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtValidationService } from './src/application/validation/jwt-validation.service';
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
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtValidationService, JwtStrategy],
  exports: [JwtValidationService, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
