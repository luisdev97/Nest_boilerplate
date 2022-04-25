import { AuthModule } from './../../../auth.module';
import { LoginService } from './../../../src/application/login/login.service';
import { UserEntity } from './../../../../user/src/domain/entities/user.entity';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('CreateUserService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((user) => Promise.resolve({ id: 1 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: process.env.SECRETKEY || 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      providers: [
        LoginService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
