import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AddNewBankService } from './add-new-bank.service';
import { CreateAddNewBankDto } from './dto/create-add-new-bank.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('add-new-bank')
export class AddNewBankController {

  constructor(private readonly bankService: AddNewBankService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() dto: CreateAddNewBankDto
  ) {
    const userId = req.user.userId;
    return this.bankService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.bankService.findAll(userId);
  }

}