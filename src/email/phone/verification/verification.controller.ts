import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp.dto';
import { SendPhoneOtpDto } from './dto/send-phone-otp.dto';
import { VerifyPhoneOtpDto } from './dto/verify-phone-otp.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    userId: string;
    companyId: string;
    email: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('verification')
export class VerificationController {
  constructor(private readonly service: VerificationService) {}

  // ================= EMAIL =================

  @Post('email/send-otp')
  sendEmailOtp(
    @Body() dto: SendEmailOtpDto,
    @Req() req: AuthRequest,
  ) {
    const companyId = req.user.companyId;
    return this.service.sendEmailOtp(dto.email, companyId);
  }

  @Post('email/verify-otp')
  verifyEmailOtp(
    @Body() dto: VerifyEmailOtpDto,
    @Req() req: AuthRequest,
  ) {
    const companyId = req.user.companyId;
    return this.service.verifyEmailOtp(
      dto.email,
      dto.otp,
      companyId,
    );
  }

  // ================= PHONE =================

  @Post('phone/send-otp')
  sendPhoneOtp(
    @Body() dto: SendPhoneOtpDto,
    @Req() req: AuthRequest,
  ) {
    const companyId = req.user.companyId;
    return this.service.sendPhoneOtp(dto.phone, companyId);
  }

  @Post('phone/verify-otp')
  verifyPhoneOtp(
    @Body() dto: VerifyPhoneOtpDto,
    @Req() req: AuthRequest,
  ) {
    const companyId = req.user.companyId;
    return this.service.verifyPhoneOtp(
      dto.phone,
      dto.otp,
      companyId,
    );
  }
}