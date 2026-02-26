import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PaymentReceivedService } from './payments.service';
import { CreatePaymentReceivedDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('payments-received')
@UseGuards(JwtAuthGuard)
export class PaymentReceivedController {
  constructor(
    private readonly paymentService: PaymentReceivedService,
  ) { }

  @Post()
  create(
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: CreatePaymentReceivedDto
  ) {
    return this.paymentService.createPayment(dto, userId, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.paymentService.getPayments(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.paymentService.getPaymentById(id, companyId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: Partial<CreatePaymentReceivedDto>,
  ) {
    return this.paymentService.updatePayment(id, dto, companyId);
  }
}
