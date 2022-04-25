import { InvalidCredentialsError } from './../../../src/domain/errors/invalid-credentials.domain.error';
import { LoginInputDto } from './../../../src/infrastructure/controllers/v1/login/login.input.dto';
import { UserNotFoundError } from './../../../../user/src/domain/errors/user-not-found.domain.error';
import { MockType } from './../../../../../../test/utilities/mock-factory';
import { LoginService } from './../../../src/application/login/login.service';
import { UserEntity } from './../../../../user/src/domain/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';
import {
  INVALID_CREDENTIALS_RESPONSE_FIXTURE,
  VALID_CREDENTIALS_RESPONSE_FIXTURE,
  VALID_USER_LOGIN_INPUT_FIXTURE,
} from './login.fixture';

/* eslint-disable @typescript-eslint/no-unused-vars */
describe('CreateUserService', () => {
  let service: LoginService;
  let jwtService: JwtService;
  let userRepositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const mockUserService = {
      findOne: jest
        .fn()
        .mockImplementation((dto) => Promise.resolve(UserEntity)),
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
    jwtService = module.get<JwtService>(JwtService);
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a http exception if the user if not found', async () => {
    const params: LoginInputDto = {
      email: 'mail@gmail.com',
      password: 'password',
    };
    userRepositoryMock.findOne.mockReturnValue(undefined);
    expect(service.execute(params)).rejects.toThrowError(
      new UserNotFoundError(),
    );
  });

  it('should return a http exception if the password of the finded user did not match with the provided password', async () => {
    userRepositoryMock.findOne.mockReturnValue(
      INVALID_CREDENTIALS_RESPONSE_FIXTURE,
    );
    expect(
      service.execute(VALID_USER_LOGIN_INPUT_FIXTURE),
    ).rejects.toThrowError(new InvalidCredentialsError());
  });

  it('should return the Jwt if the credentials are valid', async () => {
    userRepositoryMock.findOne.mockReturnValue(
      VALID_CREDENTIALS_RESPONSE_FIXTURE,
    );
    const serviceResponse = await service.execute(
      VALID_USER_LOGIN_INPUT_FIXTURE,
    );
    const jwtVerification = await jwtService.verify(serviceResponse);
    expect(
      jwtVerification.email === VALID_USER_LOGIN_INPUT_FIXTURE.email,
    ).toEqual(true);
  });
});
