import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllusers() {
    const users = this.userRepository.findAll();
    return users;
  }
}
