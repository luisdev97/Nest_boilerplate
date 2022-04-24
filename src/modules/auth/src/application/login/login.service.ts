import { UserEntity } from './../../../../user/src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInputDto } from '../../infrastructure/controllers/v1/login/login.input.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await comparePasswords(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async execute(params: LoginInputDto): Promise<string> {
    const user = await this.findUserForLogin(params);
    const jwt = await this.jwtService.sign({ id: user.id, email: user.email });
    return jwt;
  }
}
