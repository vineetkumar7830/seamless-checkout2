import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionBillingService } from './subscription-billing.service';
import { CreateSubscriptionBillingDto } from './dto/create-subscription-billing.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    userId: string;
    companyId: string;
    email: string;
  };
}

@Controller('subscription-billing')
@UseGuards(AuthGuard('jwt'))
export class SubscriptionBillingController {
  constructor(private readonly service: SubscriptionBillingService) {}

  @Post()
  async create(
    @Body() dto: CreateSubscriptionBillingDto,
    @Req() req: AuthRequest,
  ) {
    if (!req.user?.userId || !req.user?.companyId) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.service.create(
      dto,
      req.user.userId,
      req.user.companyId,
    );
  }

  @Get()
  async findAll(@Req() req: AuthRequest) {
    if (!req.user?.userId || !req.user?.companyId) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.service.findAll(
      req.user.userId,
      req.user.companyId,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ) {
    if (!req.user?.userId || !req.user?.companyId) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.service.findOne(
      id,
      req.user.userId,
      req.user.companyId,
    );
  }
}