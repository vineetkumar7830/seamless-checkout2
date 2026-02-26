import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ReceivePayment,
  ReceivePaymentDocument,
} from './entities/receive-payment.entity';
import { CreateReceivePaymentDto } from './dto/create-receive-payment.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class ReceivePaymentService {
  constructor(
    @InjectModel(ReceivePayment.name)
    private readonly receivePaymentModel: Model<ReceivePaymentDocument>,
  ) { }

  async create(dto: CreateReceivePaymentDto, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (dto.receiveFrom === 'payee' && !dto.payeeId) {
        throw new CustomError(400, 'payeeId is required');
      }

      if (dto.receiveFrom === 'email' && !dto.email) {
        throw new CustomError(400, 'email is required');
      }

      if (dto.receiveFrom === 'sms' && !dto.mobileNo) {
        throw new CustomError(400, 'mobileNo is required');
      }
      const { companyId: _, ...paymentData } = dto as any;

      const data = await this.receivePaymentModel.create({
        ...paymentData,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Receive payment created successfully',
        data,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const list = await this.receivePaymentModel
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Receive payments fetched successfully',
        list,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
