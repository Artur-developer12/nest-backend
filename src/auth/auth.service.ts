import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { UserModel } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private JwtSerice: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);

    console.log('candidate', candidate);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким именем существуюет',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user: UserModel) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.JwtSerice.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
