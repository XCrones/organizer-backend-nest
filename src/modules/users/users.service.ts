import { UpdateUserDTO } from './dto/update-user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  hashPassword = (password: string) => bcrypt.hash(password, 10);

  findUserByEmail = async (email: string) =>
    await this.userRepository.findOne({ where: { email: email } });

  async createUser(dto: CreateUserDTO) {
    dto.password = await this.hashPassword(dto.password);
    const user = new User();
    Object.assign(user, dto);
    return await user.save();
  }

  async publicUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, {
      where: { email },
    });

    return dto;
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }
}
