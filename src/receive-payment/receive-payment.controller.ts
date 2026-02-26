import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ReceivePaymentService } from './receive-payment.service';
import { CreateReceivePaymentDto } from './dto/create-receive-payment.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('receive-payment')
@UseGuards(JwtAuthGuard)
export class ReceivePaymentController {
  constructor(private readonly service: ReceivePaymentService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateReceivePaymentDto) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }
}
