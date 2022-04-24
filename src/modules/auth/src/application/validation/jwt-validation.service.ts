import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidationService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(token: string): Promise<boolean> {
    const isValidToken = this.jwtService.verify(token);
    return isValidToken;
  }
}
