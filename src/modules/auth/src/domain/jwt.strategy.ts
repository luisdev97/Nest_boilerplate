import { UserEntity } from '../../../user/src/domain/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: 'little_secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const { email } = payload;
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
