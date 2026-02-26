import { Injectable, BadRequestException } from '@nestjs/common';
import CustomError from 'src/provider/customer-error.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PaymentLink,
  PaymentLinkDocument,
} from './entities/payment-link.entity';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';

@Injectable()
export class PaymentLinkService {
  constructor(
    @InjectModel(PaymentLink.name)
    private paymentModel: Model<PaymentLinkDocument>,
  ) { }

  // 🔥 CREATE
  async create(companyId: string, dto: CreatePaymentLinkDto) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const exists = await this.paymentModel.findOne({
      companyId: new Types.ObjectId(companyId),
      paymentLinkPath: dto.paymentLinkPath,
    });

    if (exists) {
      throw new BadRequestException('Payment link already exists');
    }

    const domain = process.env.PAYMENT_LINK_DOMAIN;
    const fullUrl = `${domain}/${dto.paymentLinkPath}`;

    const { companyId: _, ...paymentData } = dto as any;

    return this.paymentModel.create({
      ...paymentData,
      companyId: new Types.ObjectId(companyId),
      receivingBankAccountId: new Types.ObjectId(
        dto.receivingBankAccountId,
      ),
      fullPaymentUrl: fullUrl,
      expirationDate: dto.expirationDate
        ? new Date(dto.expirationDate)
        : undefined,
    });
  }


  async findAll(companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    return this.paymentModel.find({
      companyId: new Types.ObjectId(companyId),
    }).sort({ createdAt: -1 });
  }

  // 🔥 UPDATE
  async update(
    companyId: string,
    id: string,
    dto: UpdatePaymentLinkDto,
  ) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const payment = await this.paymentModel.findOne({
      _id: id,
      companyId: new Types.ObjectId(companyId),
    });

    if (!payment) {
      throw new BadRequestException('Payment link not found');
    }

    // Unique path check
    if (dto.paymentLinkPath) {
      const exists = await this.paymentModel.findOne({
        companyId: new Types.ObjectId(companyId),
        paymentLinkPath: dto.paymentLinkPath,
        _id: { $ne: id },
      });

      if (exists) {
        throw new BadRequestException(
          'Payment link path already exists',
        );
      }

      const domain = process.env.PAYMENT_LINK_DOMAIN;
      dto['fullPaymentUrl'] = `${domain}/${dto.paymentLinkPath}`;
    }

    if (dto.receivingBankAccountId) {
      dto.receivingBankAccountId = new Types.ObjectId(
        dto.receivingBankAccountId,
      ) as any;
    }

    if (dto.expirationDate) {
      dto.expirationDate = new Date(
        dto.expirationDate,
      ) as any;
    }

    return this.paymentModel.findOneAndUpdate(
      { _id: id, companyId: new Types.ObjectId(companyId) },
      { ...dto, companyId: new Types.ObjectId(companyId) },
      { new: true },
    );
  }

  // 🔥 PUBLIC
  async getPublic(path: string) {
    const link = await this.paymentModel.findOne({
      paymentLinkPath: path,
    });

    if (!link) {
      throw new BadRequestException('Payment link not found');
    }

    return link;
  }
}
