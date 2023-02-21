import { APP_ERRORS } from './../../common/errors';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  private hashPassword = (password: string) => bcrypt.hash(password, 10);

  private findUserByEmail = async (email: string) =>
    await this.userRepository.findOne({ where: { email } });

  async createUser(dto: CreateUserDto) {
    const userFind = await this.findUserByEmail(dto.email);

    if (userFind) {
      throw new BadRequestException(APP_ERRORS.EMAIL_BUSY);
    }

    dto.password = await this.hashPassword(dto.password);
    const user = new User();
    Object.assign(user, dto);
    return await user.save();
  }

  async updateUser(dto: UpdateUserDto, id: number) {
    //
  }
}
