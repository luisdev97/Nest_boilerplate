import { CreateUserInvalidParamsError } from './../../domain/errors/create-user.domain.error';
import { CreateUserInputDTO } from '../../infrastructure/controllers/v1/create-user/create-user.input.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserResponseDto } from './create-user.response.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(params: CreateUserInputDTO): Promise<CreateUserResponseDto> {
    if (!params.email || !params.password) {
      throw new CreateUserInvalidParamsError();
    }

    const newUser = this.userRepository.create(params);
    const savedUser = await this.userRepository.save(newUser);
    return { id: savedUser.id };
  }
}
