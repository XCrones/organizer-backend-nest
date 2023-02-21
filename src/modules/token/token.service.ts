import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../auth/dto/user.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async JWTTokenGenerate(user: UserDTO) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt_secret'),
      expiresIn: this.configService.get('jwt_expire'),
    });
  }
}
