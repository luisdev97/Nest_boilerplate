import { UserNotFoundError } from '../../../../user/src/domain/errors/user-not-found.domain.error';
import { InvalidCredentialsError } from './../../domain/errors/invalid-credentials.domain.error';
import { UserEntity } from './../../../../user/src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInputDto } from '../../infrastructure/controllers/v1/login/login.input.dto';
import { compare as comparePasswords } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  private async findUserForLogin({
    email,
    password,
  }: LoginInputDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UserNotFoundError();
    }

    const areEqual = await comparePasswords(password, user.password);

    if (!areEqual) {
      throw new InvalidCredentialsError();
    }

    return user;
  }

  async execute(params: LoginInputDto): Promise<string> {
    const user = await this.findUserForLogin(params);
    const jwt = await this.jwtService.sign({ id: user.id, email: user.email });
    return jwt;
  }
}
