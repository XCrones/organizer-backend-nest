import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
