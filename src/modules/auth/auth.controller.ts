import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignInResponse } from './response/sign-in.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signIn(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.signUpUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: AuthSignInResponse })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signUp(@Body() dto: AuthSignInDto): Promise<AuthSignInResponse> {
    return this.authService.signInUser(dto);
  }
}
