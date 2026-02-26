import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { SubscriptionService } from './subscription.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { UpgradeDto } from './dto/upgrade.dto';
import { FeatureGuard } from './feature.guard';

@Controller('subscription')
export class SubscriptionController {
  constructor(private service: SubscriptionService) { }

  @Post('plan')
  createPlan(@Body() dto: CreatePlanDto) {
    console.log('BODY RECEIVED =>', dto);
    return this.service.createPlan(dto);
  }

  @Get('plans')
  getPlans() {
    return this.service.getPlans();
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  subscribe(@Body() dto: SubscribeDto, @GetUser('companyId') companyId: string) {
    dto.companyId = companyId;
    return this.service.subscribe(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upgrade-downgrade')
  upgrade(@Body() dto: UpgradeDto, @GetUser('companyId') companyId: string) {
    dto.companyId = companyId;
    return this.service.upgradeDowngrade(dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@GetUser('companyId') companyId: string) {
    return this.service.getCompanySubscription(companyId);
  }

  @UseGuards(FeatureGuard)
  @Get('create-invoice')
  createInvoice() {
    return { message: 'Feature allowed' };
  }
}
