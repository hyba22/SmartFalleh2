import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ValidatedUser } from './dto/validated-user.dto';
import { Request } from 'express';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private tokenBlacklist: TokenBlacklistService, // inject blacklist service
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
              const [type, token] = authHeader.split(' ');
              if (type === 'Bearer' && token) return token;
            }
            if (req.cookies?.['access_token']) return req.cookies['access_token'];
            if (req.query?.token) return Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;
            return null;
          } catch {
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

  async validate(payload: any, req: Request): Promise<ValidatedUser> {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && this.tokenBlacklist.has(token)) {
      this.logger.warn(`Blacklisted token attempted: ${token.substring(0, 10)}...`);
      throw new UnauthorizedException('Token has been revoked');
    }

    if (!payload) throw new UnauthorizedException('Invalid token');

    const userId = payload.sub || payload.id;
    if (!userId || !payload.email) throw new UnauthorizedException('Invalid token payload');

    const user: ValidatedUser = {
      id: userId,
      email: payload.email,
      role: payload.role || 'user',
      nom: payload.nom || '',
      prenom: payload.prenom || '',
      telephone: payload.telephone || '',
      adresse: payload.adresse,
      region: payload.region,
      surfaceFerme: payload.surfaceFerme,
      nbrVaches: payload.nbrVaches,
    };

    return user;
  }
}
