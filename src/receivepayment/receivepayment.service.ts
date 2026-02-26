// src/receivepayment/receivepayment.service.ts

import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  ReceivePayment,
  ReceivePaymentDocument,
} from './entities/receivepayment.entity';
import { CreateReceivePaymentDto } from './dto/create-receivepayment.dto';

@Injectable()
export class ReceivePaymentService {
  constructor(
    @InjectModel(ReceivePayment.name)
    private receivePaymentModel: Model<ReceivePaymentDocument>,
  ) {}

  async create(dto: CreateReceivePaymentDto, user: any) {
    // Amount validation
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Amount is required');
    }

    // Mode validation
    if (dto.receiveFrom === 'payee' && !dto.payeeId) {
      throw new BadRequestException('Select Your Payee is required');
    }

    if (dto.receiveFrom === 'email' && !dto.email) {
      throw new BadRequestException('Enter Email is required');
    }

    if (dto.receiveFrom === 'sms' && !dto.mobile) {
      throw new BadRequestException('Enter Mobile No is required');
    }

    const payment = new this.receivePaymentModel({
      ...dto,
      tenantId: new Types.ObjectId(user.tenantId),
      createdBy: new Types.ObjectId(user.userId),
      payeeId: dto.payeeId ? new Types.ObjectId(dto.payeeId) : null,
      walletId: new Types.ObjectId(dto.walletId),
    });

    return payment.save();
  }

  async findAll(user: any) {
    return this.receivePaymentModel
      .find({ tenantId: user.tenantId })
      .populate('payeeId')
      .populate('walletId')
      .sort({ createdAt: -1 });
  }
}