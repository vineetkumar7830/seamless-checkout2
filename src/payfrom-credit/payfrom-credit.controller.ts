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
import { PayFromCreditService } from './payfrom-credit.service';
import { CreateCreditPayDto } from './dto/create-payfrom-credit.dto';

@Controller('payfrom-credit')
@UseGuards(JwtAuthGuard)
export class PayFromCreditController {
  constructor(private readonly service: PayFromCreditService) {}

  // SAVE
  @Post('save')
  save(@Body() dto: CreateCreditPayDto, @Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.save(dto, companyId);
  }

  @Post('confirm/:id')
  confirm(@Param('id') id: string, @Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.confirm(id, companyId);
  }

  @Get('list')
  list(@Req() req: any) {
    const companyId = req.user.companyId;
    return this.service.list(companyId);
  }
}