import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Payment, PaymentSchema } from './entities/new-payment.entity';
import { Payee, PayeeSchema } from '../payee/entities/payee.entity';

import { NewPaymentController } from './new-payment.controller';
import { NewPaymentService } from './new-payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Payee.name, schema: PayeeSchema }   // ✅ yeh add karna hai
    ]),
  ],
  controllers: [NewPaymentController],
  providers: [NewPaymentService],
})
export class NewPaymentModule {}