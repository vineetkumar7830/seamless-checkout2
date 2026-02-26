import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  SubscriptionBilling,
  SubscriptionBillingDocument,
} from './entities/subscription-billing.entity';

import { CreateSubscriptionBillingDto } from './dto/create-subscription-billing.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class SubscriptionBillingService {
  constructor(
    @InjectModel(SubscriptionBilling.name)
    private billingModel: Model<SubscriptionBillingDocument>,
  ) {}

  // ✅ CREATE (User + Company based)
  async create(
    dto: CreateSubscriptionBillingDto,
    userId: string,
    companyId: string,
  ) {
    try {
      if (!userId || !companyId) {
        throw new CustomError(400, 'Token data missing');
      }

      const billing = await this.billingModel.create({
        ...dto,
        user: new Types.ObjectId(userId),
        companyId,
        isPaid: true,
      });

      return new CustomResponse(
        201,
        'Payment Successful',
        billing,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ FIND ALL (Company Safe)
  async findAll(userId: string, companyId: string) {
    try {
      const list = await this.billingModel.find({
        user: new Types.ObjectId(userId),
        companyId,
      });

      return new CustomResponse(
        200,
        'Billing records fetched successfully',
        list,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ✅ FIND ONE (Company Safe)
  async findOne(
    id: string,
    userId: string,
    companyId: string,
  ) {
    try {
      const data = await this.billingModel.findOne({
        _id: id,
        user: new Types.ObjectId(userId),
        companyId,
      });

      if (!data) {
        throw new CustomError(404, 'Data not found');
      }

      return new CustomResponse(
        200,
        'Billing record fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
}