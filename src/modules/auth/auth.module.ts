import { JwtStrategy } from './src/domain/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtValidationService } from './src/application/validation/jwt-validation.service';
import { UserEntity } from './../user/src/domain/entities/user.entity';
import { LoginController } from './src/infrastructure/controllers/v1/login/login.controller';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './src/application/login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtModuleAsyncConf } from '../../configuration/jwt.conf';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtModuleAsyncConf),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtValidationService, JwtStrategy],
  exports: [JwtValidationService, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
