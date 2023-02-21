import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  private hashPassword = (password: string) => bcrypt.hash(password, 10);

  private findUserByEmail = (email: string) =>
    this.userRepository.findOne({ where: { email } });

  async createUser(dto: CreateUserDto) {
    dto.password = await this.hashPassword(dto.password);
    const user = new User();
    Object.assign(user, dto);
    return await user.save();
  }

  async updateUser(dto: UpdateUserDto, id: number) {
    //
  }
}
