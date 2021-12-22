import { ROLES_KEY } from './roles-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { bearerAuthStartPart, NetworkErrors } from './constants';
import { Reflector } from '@nestjs/core';
import { User } from 'src/database/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      // , context.getClass()
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler()
      ]);
      if (!requiredRoles) {
        return true;
      }
      const authHeaders = req.headers.authorization.split(' ');
      const token = authHeaders[1];
      if (authHeaders[0] !== bearerAuthStartPart || !token) {
        throw new UnauthorizedException({
          message: NetworkErrors.UNAUTHORIZED_USER
        });
      }
      const user: User = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
      return req;
    } catch (error) {
      throw new HttpException(NetworkErrors.FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }
}
