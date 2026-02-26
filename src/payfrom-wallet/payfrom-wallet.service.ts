import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WalletPay } from './entities/payfrom-wallet.entity';
import { CreateWalletPayDto } from './dto/create-payfrom-wallet.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PayFromWalletService {
  constructor(
    @InjectModel(WalletPay.name)
    private walletPayModel: Model<WalletPay>,
  ) {}

  // SAVE (Company Based)
  async save(dto: CreateWalletPayDto, companyId: string) {
    try {
      const data = await this.walletPayModel.create({
        ...dto,
        companyId,
        payFrom: 'wallet',
        status: 'draft',
      });

      return new CustomResponse(
        201,
        'Wallet payment saved successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // CONFIRM PAYMENT (Company Secure)
  async confirm(id: string, companyId: string) {
    try {
      const data = await this.walletPayModel.findOneAndUpdate(
        { _id: id, companyId },
        { status: 'confirmed' },
        { new: true },
      );

      if (!data) {
        throw new CustomError(404, 'Wallet payment not found');
      }

      return new CustomResponse(
        200,
        'Wallet payment confirmed successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
 
  // LIST (Company Wise)
  async list(companyId: string) {
    try {
      const data = await this.walletPayModel
        .find({ companyId })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Wallet payments fetched',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
} 