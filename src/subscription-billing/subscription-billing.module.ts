import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionBilling,
  SubscriptionBillingSchema,
} from './entities/subscription-billing.entity';
import { SubscriptionBillingController } from './subscription-billing.controller';
import { SubscriptionBillingService } from './subscription-billing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionBilling.name, schema: SubscriptionBillingSchema },
    ]),
  ],
  controllers: [SubscriptionBillingController],
  providers: [SubscriptionBillingService],
})
export class SubscriptionBillingModule {}