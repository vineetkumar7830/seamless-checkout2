import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddNewBankAccountService } from './add-new-bank-account.service';
import { CreateBankAccountDto } from './dto/create-add-new-bank-account.dto';

@UseGuards(JwtAuthGuard)
@Controller('add-new-bank-account')
export class AddNewBankAccountController {

  constructor(private readonly service: AddNewBankAccountService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateBankAccountDto) {
    const userId = req.user.userId;
    const companyId = req.user.companyId;
    return this.service.create(userId, companyId, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.userId;
    const companyId = req.user.companyId;
    return this.service.findAll(userId, companyId);
  }
}