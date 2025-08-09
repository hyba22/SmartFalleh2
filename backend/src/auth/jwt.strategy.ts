import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ValidatedUser } from './dto/validated-user.dto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    // token function
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            // 1. Try to extract token from Authorization header
            const authHeader = req.headers.authorization;
            if (authHeader) {
              const [type, token] = authHeader.split(' ');
              if (type === 'Bearer' && token) {
                this.logger.debug('Token extracted from Authorization header');
                return token;
              }
              this.logger.warn('Malformed Authorization header format');
            }
            
            // 2. Try to extract from cookies
            if (req.cookies?.['access_token']) {
              const token = req.cookies['access_token'];
              if (token) {
                this.logger.debug('Token extracted from cookies');
                return token;
              }
            }
            
            // 3. Try to extract from query parameters
            if (req.query?.token) {
              const token = Array.isArray(req.query.token) 
                ? req.query.token[0] 
                : req.query.token;
              if (token) {
                this.logger.debug('Token extracted from query parameters');
                return token;
              }
            }
            
            // 4. Debug information
            this.logger.warn('No JWT token found in request. Available headers:', 
              Object.keys(req.headers).join(', '));
            return null;
            
          } catch (error) {
            this.logger.error('Error extracting JWT token:', error);
            return null;
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    };
    
    super(options);
  }

  async validate(payload: any): Promise<ValidatedUser> {
    try {
      this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
      
      if (!payload) {
        this.logger.warn('No payload provided in JWT');
        throw new UnauthorizedException('Invalid token');
      }

      // Allow both 'sub' and 'id' fields in the payload
      const userId = payload.sub || payload.id;
      
      // Basic payload validation
      if (!userId || !payload.email) {
        this.logger.warn('Invalid JWT payload - missing required fields');
        throw new UnauthorizedException('Invalid token payload');
      }

      const user: ValidatedUser = {
        id: userId,
        email: payload.email,
        role: payload.role || 'user',
        nom: payload.nom || '',
        prenom: payload.prenom || '',
        telephone: payload.telephone || ''
      };

      this.logger.debug(`JWT validation successful for user: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(`JWT validation failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
