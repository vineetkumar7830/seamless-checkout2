import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { FundTransaction } from './entities/fund-wallet.entity';
import { FundAchDto } from './dto/fund-ach.dto';
import { FundWireDto } from './dto/fund-wire.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class FundWalletService {
  constructor(
    @InjectModel(FundTransaction.name)
    private fundModel: Model<FundTransaction>,
  ) {}

  // ================= ACH =================
  async fundByAch(dto: FundAchDto, companyId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(companyId))
        throw new CustomError(400, 'Invalid companyId');

      if (!Types.ObjectId.isValid(userId))
        throw new CustomError(400, 'Invalid userId');

      const tx = await this.fundModel.create({
        companyId: new Types.ObjectId(companyId),
        userId: new Types.ObjectId(userId),
        method: 'ACH',
        bankAccountId: new Types.ObjectId(dto.bankAccountId),
        walletId: new Types.ObjectId(dto.walletId),
        amount: dto.amount,
        comment: dto.comment,
        status: 'pending',
      });

      return new CustomResponse(
        201,
        'Wallet funded via ACH successfully',
        tx,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= WIRE =================
  async fundByWire(dto: FundWireDto, companyId: string, userId: string) {
    try {
      if (!dto.digitalSignature)
        throw new CustomError(400, 'Digital signature required');

      const tx = await this.fundModel.create({
        companyId: new Types.ObjectId(companyId),
        userId: new Types.ObjectId(userId),
        method: 'WIRE',
        bankAccountId: new Types.ObjectId(dto.bankAccountId),
        walletId: new Types.ObjectId(dto.walletId),
        amount: dto.amount,
        comment: dto.comment,
        signatureName: dto.signatureName,
        digitalSignature: dto.digitalSignature,
        status: 'pending',
      });

      return new CustomResponse(
        201,
        'Wallet funded via Wire successfully',
        tx,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GET ALL =================
  async list(companyId: string) {
    try {
      const data = await this.fundModel
        .find({
          companyId: new Types.ObjectId(companyId),
        })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Fund transactions fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GET MY =================
  async listByUser(companyId: string, userId: string) {
    try {
      const data = await this.fundModel
        .find({
          companyId: new Types.ObjectId(companyId),
          userId: new Types.ObjectId(userId),
        })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'User fund transactions fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async getSingle(id: string, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id))
        throw new CustomError(400, 'Invalid transaction ID');

      const tx = await this.fundModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!tx)
        throw new CustomError(404, 'Transaction not found');

      return new CustomResponse(
        200,
        'Transaction fetched successfully',
        tx,
      );
    } catch (error) {
      throwException(error);
    }
  }
}