import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { PayFromService } from './payfronm.service';
import { CreatePayFromDto } from './dto/create-payfronm.dto';
import { UpdatePayFromActionDto } from './dto/update-payfronm.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payfrom')
export class PayFromController {
  constructor(private readonly service: PayFromService) {}

  // ✅ SAVE BUTTON
  @Post('save')
  save(@Body() dto: CreatePayFromDto, @Req() req: Request) {
    const user = req['user']; // JWT payload
    return this.service.create(dto, user);
  }

  // ✅ SEND / PRINT / DIRECT DEPOSIT
  @Post('action')
  action(@Body() dto: UpdatePayFromActionDto, @Req() req: Request) {
    const user = req['user'];
    return this.service.performAction(dto, user);
  }

  // ✅ LIST
  @Get('list')
  getAll(@Req() req: Request) {
    const user = req['user'];
    return this.service.getAll(user);
  }
}