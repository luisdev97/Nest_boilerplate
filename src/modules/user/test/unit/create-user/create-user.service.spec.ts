import { CreateUserInvalidParamsError } from './../../../src/domain/errors/create-user.domain.error';
import {
  CREATE_USER_BAD_PARAMS_FIXTURE,
  CREATE_USER_VALID_PARAMS_FIXTURE,
} from './create-user.fixture';
import { UserEntity } from '../../../src/domain/entities/user.entity';
import { CreateUserService } from '../../../src/application/create-user/create-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const mockUserService = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((user) => Promise.resolve({ id: 2 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user and return only the ID', async () => {
    const serviceResponse = await service.execute(
      CREATE_USER_VALID_PARAMS_FIXTURE,
    );
    expect(serviceResponse).toEqual({ id: expect.any(Number) });
  });

  it('should throw an error when email or password contain invalid values', () => {
    expect(
      service.execute(CREATE_USER_BAD_PARAMS_FIXTURE),
    ).rejects.toThrowError(new CreateUserInvalidParamsError());
  });
});
