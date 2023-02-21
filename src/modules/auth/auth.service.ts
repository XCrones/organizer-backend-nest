import { TokenService } from './../token/token.service';
import { APP_ERRORS } from './../../common/errors';
import { CreateUserDTO } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signin.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInResponse } from './response/sign-in.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signUpUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (findUser) {
      throw new BadRequestException(APP_ERRORS.EMAIL_BUSY);
    }
    return this.userService.createUser(dto);
  }

  async signInUser(dto: AuthSignInDTO): Promise<AuthSignInResponse> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (!findUser) {
      throw new BadRequestException(APP_ERRORS.AUTH_INCORRECT);
    }

    const validPassword = await bcrypt.compare(dto.password, findUser.password);
    if (!validPassword) {
      throw new BadRequestException(APP_ERRORS.AUTH_INCORRECT);
    }

    const userData = {
      email: findUser.email,
      name: findUser.name,
    };

    const token = await this.tokenService.JWTTokenGenerate(userData);
    const publicUser = await this.userService.publicUser(dto.email);

    return { ...publicUser, token } as AuthSignInResponse;
  }
}
