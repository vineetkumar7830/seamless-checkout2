import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceivePayment, ReceivePaymentSchema } from './entities/receive-payment.entity';
import { ReceivePaymentController } from './receive-payment.controller';
import { ReceivePaymentService } from './receive-payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReceivePayment.name, schema: ReceivePaymentSchema },
    ]),
  ],
  controllers: [ReceivePaymentController],
  providers: [ReceivePaymentService],
})
export class ReceivePaymentModule {}
