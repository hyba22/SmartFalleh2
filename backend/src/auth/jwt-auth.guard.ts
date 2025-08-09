import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Add your public routes here
    const isPublic = this.isPublicRoute(context);
    if (isPublic) {
      return true;
    }
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
    if (err || !user) {
      throw err || new Error('Invalid or missing JWT token');
    }
    return user;
  }
}
