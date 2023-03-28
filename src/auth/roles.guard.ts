import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/roles.model';
import { ROLES_KEY } from './roles-auth.decorator';

interface JwtResult {
  id: number;
  email: string;
  roles: Role[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requireRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      console.log('authHeader', authHeader);
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const user = await this.jwtService.verifyAsync<JwtResult>(token);
      req.user = user;
      return user.roles.some((role) => requireRoles.includes(role.value));
    } catch {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
