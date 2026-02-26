import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
 

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PayFromWalletService } from './payfrom-wallet.service';
import { CreateWalletPayDto } from './dto/create-payfrom-wallet.dto';

@Controller('payfrom-wallet')
@UseGuards(JwtAuthGuard)
export class PayFromWalletController {
  constructor(private readonly service: PayFromWalletService) {}

  // SAVE
  @Post('save')
  save(@Body() dto: CreateWalletPayDto, @Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.save(dto, companyId);
  }

  // CONFIRM PAYMENT
  @Post('confirm/:id')
  confirm(@Param('id') id: string, @Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.confirm(id, companyId);
  }

  // LIST
  @Get('list')
  list(@Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.list(companyId);
  }
}