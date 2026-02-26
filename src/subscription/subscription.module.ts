import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { FeatureGuard } from './feature.guard';
import { AuthModule } from '../auth/auth.module';

import { Plan, PlanSchema } from './entities/plan.schema';
import {
  UserSubscription,
  UserSubscriptionSchema,
} from './entities/user-subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: UserSubscription.name, schema: UserSubscriptionSchema },
    ]),
    AuthModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, FeatureGuard],
})
export class SubscriptionModule { }
