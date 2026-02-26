import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentReceived,
  PaymentReceivedSchema,
} from './entities/payment.entity';
import { PaymentReceivedService } from './payments.service';
import { PaymentReceivedController } from './payments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentReceived.name, schema: PaymentReceivedSchema },
    ]),
  ],
  controllers: [PaymentReceivedController],
  providers: [PaymentReceivedService],
})
export class PaymentReceivedModule {}
