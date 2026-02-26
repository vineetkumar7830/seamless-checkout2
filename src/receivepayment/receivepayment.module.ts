// src/receivepayment/receivepayment.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReceivePayment,
  ReceivePaymentSchema,
} from './entities/receivepayment.entity';
import { ReceivePaymentService } from './receivepayment.service';
import { ReceivePaymentController } from './receivepayment.controller';

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