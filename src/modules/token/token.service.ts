import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async JWTTokenGenerate(user) {
    const payload = { user };
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('jwt_secret'),
      expiresIn: this.configService.get('jwt_expire'),
    });
  }
}
