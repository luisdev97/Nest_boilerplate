import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleAsyncConf: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<JwtModuleOptions> => {
    return {
      secret: process.env.SECRET_SEED,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    };
  },
};
