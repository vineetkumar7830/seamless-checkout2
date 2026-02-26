import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRoleService } from './user-roles.service';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { VerifyInvitationOtpDto } from './dto/verify-invitation-otp.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-roles')
@UseGuards(JwtAuthGuard) // 🔐 Entire controller protected
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // ================= SEND INVITATION =================
  @Post('send-invitation')
  async sendInvitation(
    @GetUser() user: any,
    @Body() dto: SendInvitationDto,
  ) {
    if (!user?.companyId) {
      throw new UnauthorizedException('Company context missing in token');
    }

    if (!user?.email) {
      throw new UnauthorizedException('User email missing in token');
    }

    return this.service.sendInvitation(
      dto,
      user.companyId,
      user.email,
    );
  }

  // ================= VERIFY INVITATION OTP =================
  @Post('verify-invitation-otp')
  async verifyInvitationOtp(
    @GetUser() user: any,
    @Body() dto: VerifyInvitationOtpDto,
  ) {
    if (!user?.companyId) {
      throw new UnauthorizedException('Company context missing in token');
    }

    return this.service.verifyInvitationOtp(
      dto,
      user.companyId,
    );
  }
}