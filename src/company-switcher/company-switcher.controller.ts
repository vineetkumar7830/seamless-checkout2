import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CompanySwitcherService } from './company-switcher.service';
import { CreateCompanySwitcherDto } from './dto/create-company-switcher.dto';
import { SwitchCompanyDto } from './dto/set-active-company.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('api/company-switcher')
@UseGuards(JwtAuthGuard)
export class CompanySwitcherController {
  constructor(private readonly service: CompanySwitcherService) {}

  // ================= CREATE =================
  @Post('create')
  createCompany(@Req() req: Request, @Body() dto: CreateCompanySwitcherDto) {
    const user = (req as any).user;
    return this.service.createCompany(dto, user.userId);
  }

  // ================= LIST =================
  @Get('list')
  getCompanies(@Req() req: Request) {
    const user = (req as any).user;
    return this.service.getCompanies(user.userId);
  }

  // ================= ACTIVE =================
  @Get('active')
  getActiveCompany(@Req() req: Request) {
    const user = (req as any).user;
    return this.service.getActiveCompany(user.userId);
  }

  // ================= SWITCH =================
  @Post('switch')
  switchCompany(@Req() req: Request, @Body() dto: SwitchCompanyDto) {
    const user = (req as any).user;
    return this.service.switchCompany(dto, user.userId);
  }

  // ================= LOGOUT =================
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = (req as any).user;
    await this.service.handleCompanyOnLogout(user.userId);

    return { statusCode: 200, message: 'Logout successful' };
  }
}
