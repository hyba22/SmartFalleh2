import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { TokenBlacklistService } from './token-blacklist.service'; // inject service

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private tokenBlacklist: TokenBlacklistService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.isPublicRoute(context);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const publicRoutes = [
      '/api/auth/login',
      '/api/auth/signup',
      '/api',
      '/api-docs',
      '/api-docs-json'
    ];
    return publicRoutes.some(route => request.url.startsWith(route));
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token && this.tokenBlacklist.has(token)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }
    return user;
  }
}
