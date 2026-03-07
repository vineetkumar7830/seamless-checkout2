import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { RequestCompanyService } from './request-company.service';
import { CreateRequestCompanyDto } from './dto/create-request-company.dto';
import { VerifyRequestCompanyOtpDto } from './dto/verify-request-company-otp.dto';

@Controller('request-company')
export class RequestCompanyController {

  constructor(private readonly service: RequestCompanyService) {}

  @Post()
  create(
    @Body() dto: CreateRequestCompanyDto,
  ) {

    // TEMP USER DATA (testing)
    const userId = "65f1a9d2c4e3d1b8a1234567";
    const userEmail = "yourregisteredemail@gmail.com";

    return this.service.create(dto, userId, userEmail);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyRequestCompanyOtpDto) {
    return this.service.verifyOtp(dto);
  }

}