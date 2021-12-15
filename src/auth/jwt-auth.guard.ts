import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { bearerAuthStartPart, NetworkErrors } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeaders = req.headers.authorization.split(' ');
      const token = authHeaders[1];
      if (authHeaders[0] !== bearerAuthStartPart || !token) {
        throw new UnauthorizedException({
          message: NetworkErrors.UNAUTHORIZED_USER,
        });
      }
      req.user = this.jwtService.verify(token);
      return req;
    } catch (error) {
      throw new UnauthorizedException({
        message: NetworkErrors.UNAUTHORIZED_USER,
      });
    }
  }
}
