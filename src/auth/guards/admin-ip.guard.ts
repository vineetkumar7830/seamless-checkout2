import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminIpGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'ADMIN') {
      return true;
    }

    const ip =
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.socket.remoteAddress;

    const allowedIps = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];

    if (!allowedIps.includes(ip)) {
      throw new ForbiddenException(
        'Admin access blocked from this network',
      );
    }

    return true;
  }
}
