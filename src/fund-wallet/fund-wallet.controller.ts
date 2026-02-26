// src/fund-wallet/fund-wallet.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { FundWalletService } from './fund-wallet.service';
import { FundAchDto } from './dto/fund-ach.dto';
import { FundWireDto } from './dto/fund-wire.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('fund-wallet')
@UseGuards(JwtAuthGuard)
export class FundWalletController {
  constructor(private readonly service: FundWalletService) {}

  @Post('ach')
  fundAch(@Body() dto: FundAchDto, @GetUser() user: any) {
    return this.service.fundByAch(dto, user.companyId, user.userId);
  }

  @Post('wire')
  fundWire(@Body() dto: FundWireDto, @GetUser() user: any) {
    return this.service.fundByWire(dto, user.companyId, user.userId);
  }

  @Get()
  list(@GetUser('companyId') companyId: string) {
    return this.service.list(companyId);
  }

  @Get('my')
  my(@GetUser() user: any) {
    return this.service.listByUser(user.companyId, user.userId);
  }

  @Get(':id')
  single(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.getSingle(id, companyId);
  }
}