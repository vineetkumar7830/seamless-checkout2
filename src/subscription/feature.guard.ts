import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserSubscription,
  UserSubscriptionDocument,
} from './entities/user-subscription.schema';
import { Plan, PlanDocument } from './entities/plan.schema';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    @InjectModel(UserSubscription.name)
    private userSubModel: Model<UserSubscriptionDocument>,
    @InjectModel(Plan.name)
    private planModel: Model<PlanDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.headers['userid'];
    const requiredFeature = request.headers['feature'];

    const subscription = await this.userSubModel.findOne({
      userId,
      active: true,
    });

    if (!subscription) return false;

    const plan = await this.planModel.findById(subscription.planId);

  
    if (!plan) return false;
    
    if (!plan) return false;

    return plan.features.includes(requiredFeature);
  }
}
