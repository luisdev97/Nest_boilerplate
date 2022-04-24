import { CreateUserInputDTO } from './../../infrastructure/controllers/v1/create-user.input.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserResponseDto } from './create-user.response.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(params: CreateUserInputDTO): Promise<CreateUserResponseDto> {
    const SALT_ROUNDS = 15;
    const salt = genSaltSync(SALT_ROUNDS);

    const newUser = this.userRepository.create({
      email: params.email,
      password: hashSync(params.password, salt),
    });

    console.log(newUser);

    const savedUser = await this.userRepository.save(newUser);
    return { id: savedUser.id };
  }
}
