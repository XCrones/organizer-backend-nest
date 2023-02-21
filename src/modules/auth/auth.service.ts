import { TokenService } from './../token/token.service';
import { APP_ERRORS } from './../../common/errors';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInResponse } from './response/sign-in.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signUpUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (findUser) {
      throw new BadRequestException(APP_ERRORS.EMAIL_BUSY);
    }
    return this.userService.createUser(dto);
  }

  async signInUser(dto: AuthSignInDto): Promise<AuthSignInResponse> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (!findUser) {
      throw new BadRequestException(APP_ERRORS.AUTH_INCORRECT);
    }

    const validPassword = await bcrypt.compare(dto.password, findUser.password);
    if (!validPassword) {
      throw new BadRequestException(APP_ERRORS.AUTH_INCORRECT);
    }

    const user = new AuthSignInResponse();
    user.email = findUser.email;
    user.name = findUser.name;
    user.urlAvatar = findUser.urlAvatar;
    user.id = findUser.id;
    user.token = await this.tokenService.JWTTokenGenerate(findUser.email);

    return user;
  }
}
