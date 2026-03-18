import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PayFrom } from './entities/payfronm.entity';
import { CreatePayFromDto } from './dto/create-payfronm.dto';
import { UpdatePayFromActionDto } from './dto/update-payfronm.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PayFromService {
  constructor(
    @InjectModel(PayFrom.name)
    private payFromModel: Model<PayFrom>,
  ) {}

  // ✅ SAVE
  async create(dto: CreatePayFromDto, user: any): Promise<CustomResponse> {
    try {
      if (!dto) {
        throw new CustomError(400, 'Payload is required');
      }

      const data = await this.payFromModel.create({
        ...dto,
        companyId: user.companyId, // 🔥 SaaS
        action: 'save',
        status: 'draft',
      });

      return new CustomResponse(
        201,
        'Payment saved successfully',
        data,
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ ACTION
  async performAction(dto: UpdatePayFromActionDto, user: any): Promise<CustomResponse> {
    try {

      if (!dto?.paymentId) {
        throw new CustomError(400, 'PaymentId is required');
      }

      const payment = await this.payFromModel.findOne({
        _id: dto.paymentId,
        companyId: user.companyId, // 🔥 SECURITY
      });

      if (!payment) {
        throw new CustomError(404, 'Payment not found');
      }

      payment.action = dto.action;

      if (dto.action === 'send') payment.status = 'sent';
      else if (dto.action === 'print') payment.status = 'printed';
      else if (dto.action === 'direct-deposit') payment.status = 'deposited';
      else {
        throw new CustomError(400, 'Invalid action type');
      }

      await payment.save();

      return new CustomResponse(
        200,
        `Payment ${dto.action} successfully`,
        payment,
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ LIST
  async getAll(user: any): Promise<CustomResponse> {
    try {

      const data = await this.payFromModel
        .find({ companyId: user.companyId }) // 🔥 SaaS filter
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Payment list fetched successfully',
        data,
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}