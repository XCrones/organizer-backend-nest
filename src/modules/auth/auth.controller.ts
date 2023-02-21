import { JwtAuthGuard } from './../../guards/jwt.guard';
import { CreateUserDTO } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signin.dto';
import { AuthSignInResponse } from './response/sign-in.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signIn(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.signUpUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: AuthSignInResponse })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signUp(@Body() dto: AuthSignInDTO): Promise<AuthSignInResponse> {
    return this.authService.signInUser(dto);
  }
}
