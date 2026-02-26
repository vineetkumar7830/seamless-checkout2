import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreditPay } from './entities/payfrom-credit.entity';
import { CreateCreditPayDto } from './dto/create-payfrom-credit.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PayFromCreditService {
  constructor(
    @InjectModel(CreditPay.name)
    private creditPayModel: Model<CreditPay>,
  ) {}

  // SAVE (Company Based)
  async save(dto: CreateCreditPayDto, companyId: string) {
    try {
      const data = await this.creditPayModel.create({
        ...dto,
        companyId,
        status: 'draft',
      });

      return new CustomResponse(
        201,
        'Payment saved successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async confirm(id: string, companyId: string) {
    try {
      const data = await this.creditPayModel.findOneAndUpdate(
        { _id: id, companyId },
        { status: 'confirmed' },
        { new: true },
      );

      if (!data) {
        throw new CustomError(404, 'Payment not found');
      }

      return new CustomResponse(
        200,
        'Payment confirmed successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // LIST (Company Wise Data)
  async list(companyId: string) {
    try {
      const data = await this.creditPayModel
        .find({ companyId })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Credit payments fetched',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
}