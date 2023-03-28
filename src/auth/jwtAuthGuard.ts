import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      console.log('authHeader', authHeader);
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const user = this.jwtService.verifyAsync(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
