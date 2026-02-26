// src/receivepayment/receivepayment.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';

import { ReceivePaymentService } from './receivepayment.service';
import { CreateReceivePaymentDto } from './dto/create-receivepayment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('receivepayments')
@UseGuards(JwtAuthGuard)
export class ReceivePaymentController {
  constructor(
    private readonly receivePaymentService: ReceivePaymentService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateReceivePaymentDto,
    @GetUser() user: any,
  ) {
    return this.receivePaymentService.create(dto, user);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.receivePaymentService.findAll(user);
  }
}