import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { RequestCompanyService } from './request-company.service';
import { CreateRequestCompanyDto } from './dto/create-request-company.dto';
import { VerifyRequestCompanyOtpDto } from './dto/verify-request-company-otp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Request Company')
@Controller('request-company')
export class RequestCompanyController {

  constructor(private readonly service: RequestCompanyService) { }

  @ApiOperation({ summary: 'Request to create a new company' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateRequestCompanyDto) {

    // Extract user details from the JWT token payload
    const userId = req.user.id || req.user._id || req.user.sub || req.user.userId;
    const userEmail = req.user.email;

    return this.service.create(dto, userId, userEmail);
  }

  @ApiOperation({ summary: 'Verify the OTP sent to complete the company request' })
  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyRequestCompanyOtpDto) {
    return this.service.verifyOtp(dto);
  }

}