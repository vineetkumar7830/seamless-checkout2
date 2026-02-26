import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BulkPay,
  BulkPayDocument,
  PayFromType,
} from './entities/bulk-pay.entity';
import { CreateBulkPayDto } from './dto/create-bulk-pay.dto';

@Injectable()
export class BulkPayService {
  constructor(
    @InjectModel(BulkPay.name)
    private bulkPayModel: Model<BulkPayDocument>,
  ) {}

  private getSourceType(payFrom: PayFromType): string {
    if (payFrom === PayFromType.WALLET) return 'Wallet';
    if (payFrom === PayFromType.BANK_ACCOUNT) return 'BankAccount';
    if (payFrom === PayFromType.CREDIT_CARD) return 'CreditCard';
    return 'Unknown';
  }

  async create(userId: string, dto: CreateBulkPayDto) {

    const formattedPayments = dto.payments.map((item) => ({
      payFrom: item.payFrom,
      payAs: item.payAs,
      sourceId: new Types.ObjectId(item.sourceId),
      sourceType: this.getSourceType(item.payFrom),
      payTo: new Types.ObjectId(item.payTo),
      amount: item.amount,
      date: new Date(item.date),
      category: item.category
        ? new Types.ObjectId(item.category)
        : undefined,
      invoiceNumber: item.invoiceNumber || '',
      memo: item.memo || '',
    }));

    const totalValidPayments =
      formattedPayments.filter((p) => p.amount > 0).length;

    const totalAmount =
      formattedPayments.reduce((sum, p) => sum + p.amount, 0);

    return this.bulkPayModel.create({
      userId: new Types.ObjectId(userId),
      payFrom: dto.payFrom,
      payAs: dto.payAs,
      sourceId: new Types.ObjectId(dto.sourceId),
      sourceType: this.getSourceType(dto.payFrom),
      amount: dto.amount,
      date: new Date(dto.date),
      category: dto.category
        ? new Types.ObjectId(dto.category)
        : undefined,
      memo: dto.memo || '',
      payments: formattedPayments,
      totalValidPayments,
      totalAmount,
    });
  }

  async findAll(userId: string) {
    return this.bulkPayModel.find({
      userId: new Types.ObjectId(userId),
    });
  }

  async findOne(userId: string, id: string) {
    const data = await this.bulkPayModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!data) throw new NotFoundException('Bulk Pay not found');

    return data;
  }

  async delete(userId: string, id: string) {
    const result = await this.bulkPayModel.deleteOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!result.deletedCount)
      throw new NotFoundException('Bulk Pay not found');

    return { message: 'Deleted successfully' };
  }
}