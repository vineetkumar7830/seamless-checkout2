import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CustomError from 'src/provider/customer-error.service';

import { Plan, PlanDocument } from './entities/plan.schema';
import {
  UserSubscription,
  UserSubscriptionDocument,
} from './entities/user-subscription.schema';

import { CreatePlanDto } from './dto/create-plan.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { UpgradeDto } from './dto/upgrade.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
    @InjectModel(UserSubscription.name)
    private userSubModel: Model<UserSubscriptionDocument>,
  ) { }

  async createPlan(dto: CreatePlanDto) {
    console.log('CREATE PLAN DTO =>', dto);

    if (!dto.name || !dto.price || !dto.billingCycle) {
      throw new BadRequestException('name, price and billingCycle are required');
    }

    const plan = await this.planModel.create({
      name: dto.name,
      price: dto.price,
      billingCycle: dto.billingCycle,
      features: dto.features,
      active: true,
    });

    console.log('PLAN SAVED IN DB =>', plan);
    return plan;
  }

  async getPlans() {
    return this.planModel.find({ active: true });
  }

  async subscribe(dto: SubscribeDto) {
    if (!dto.companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    console.log('SUBSCRIBE DTO =>', dto);

    const plan = await this.planModel.findById(dto.planId);

    console.log('PLAN FOUND =>', plan);

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const startDate = new Date();
    const endDate = new Date();

    if (plan.billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = await this.userSubModel.create({
      companyId: new Types.ObjectId(dto.companyId),
      planId: plan._id,
      planName: plan.name,
      startDate,
      endDate,
      active: true,
    });

    return subscription;
  }
  async upgradeDowngrade(dto: UpgradeDto) {
    if (!dto.companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    console.log('UPGRADE DTO =>', dto);

    const current = await this.userSubModel.findOne({
      companyId: new Types.ObjectId(dto.companyId),
      active: true,
    });

    if (current) {
      current.active = false;
      await current.save();
    }

    return this.subscribe({
      companyId: dto.companyId,
      planId: dto.newPlanId,
    });
  }

  async getCompanySubscription(companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
  
    const subscription = await this.userSubModel
      .findOne({ companyId: new Types.ObjectId(companyId), active: true })
      .populate('planId');

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

}
