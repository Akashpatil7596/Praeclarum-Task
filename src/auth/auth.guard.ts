import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const { authorization }: { authorization?: string } = request.headers;

      if (!authorization || authorization.trim() === '') {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();

      const resp = await this.authService.validateToken(authToken);

      request.user = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }
}
