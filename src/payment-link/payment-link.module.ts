import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentLink,
  PaymentLinkSchema,
} from './entities/payment-link.entity';
import { PaymentLinkService } from './payment-link.service';
import { PaymentLinkController } from './payment-link.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentLink.name, schema: PaymentLinkSchema },
    ]),
  ],
  controllers: [PaymentLinkController],
  providers: [PaymentLinkService],
  exports: [PaymentLinkService], // future use ke liye
})
export class PaymentLinkModule {}
