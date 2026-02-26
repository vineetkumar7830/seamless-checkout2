import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Transfer } from './entities/transfer-money.entity';
import { CreateTransferDto } from './dto/create-transfer-money.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class TransferMoneyService {
  constructor(
    @InjectModel(Transfer.name)
    private model: Model<Transfer>,
  ) {}

  async transfer(
    dto: CreateTransferDto,
    companyId: string,
    userId: string,
  ) {
    try {
      if (!companyId) {
        throw new CustomError(400, 'Company context missing');
      }

      if (!userId) {
        throw new CustomError(400, 'User context missing');
      }

      // 🔒 BASIC VALIDATION
      if (dto.toType === 'wallet' && !dto.toWalletId) {
        throw new CustomError(400, 'toWalletId is required');
      }

      if (dto.toType === 'cloud-bank' && !dto.toCloudBankId) {
        throw new CustomError(400, 'toCloudBankId is required');
      }

      if (dto.toType === 'account' && !dto.toAccountId) {
        throw new CustomError(400, 'toAccountId is required');
      }

      const data = await this.model.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
        userId: new Types.ObjectId(userId),
        status: 'completed',
      });

      return new CustomResponse(
        201,
        'Money transferred successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async list(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(400, 'Company context missing');
      }

      const data = await this.model
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Transfer history fetched',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
}