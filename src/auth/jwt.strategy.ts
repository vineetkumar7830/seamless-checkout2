import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    // ✅ Sirf development me config check karega
    if (process.env.NODE_ENV === 'development') {
      console.log('JWT Strategy Initialized');
    }

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  async validate(payload: any) {
    // ❌ REMOVE THIS (spam ka reason)
    // console.log('Validating JWT Payload:', payload);

    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}
