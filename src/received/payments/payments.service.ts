import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PaymentReceived,
  PaymentReceivedDocument,
} from './entities/payment.entity';
import { CreatePaymentReceivedDto } from './dto/create-payment.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PaymentReceivedService {
  constructor(
    @InjectModel(PaymentReceived.name)
    private paymentModel: Model<PaymentReceivedDocument>,
  ) { }

  async createPayment(dto: CreatePaymentReceivedDto, userId: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const { companyId: _, ...paymentData } = dto as any;

      const payment = await this.paymentModel.create({
        ...paymentData,
        received_by: userId,
        companyId: new Types.ObjectId(companyId),
        status: 'received',
      });

      return new CustomResponse(
        201,
        'Payment received successfully',
        payment,
      );
    } catch (error) {
      throwException(error);
    }
  }
  async getPayments(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const list = await this.paymentModel.find({
        companyId: new Types.ObjectId(companyId),
      }).sort({ createdAt: -1 });

      return new CustomResponse(200, 'Payments fetched successfully', {
        total: list.length,
        payments: list,
      });
    } catch (error) {
      throwException(error);
    }
  }

  async getPaymentById(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const payment = await this.paymentModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!payment) {
        throw new CustomError(404, 'Payment not found');
      }

      return new CustomResponse(
        200,
        'Payment fetched successfully',
        payment,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async updatePayment(id: string, dto: Partial<CreatePaymentReceivedDto>, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const payment = await this.paymentModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { $set: { ...dto, companyId: new Types.ObjectId(companyId) } },
        { new: true },
      );

      if (!payment) {
        throw new CustomError(404, 'Payment not found');
      }

      return new CustomResponse(
        200,
        'Payment updated successfully',
        payment,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
