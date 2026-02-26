import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  MultipleCheck,
  MultipleCheckDocument,
} from './entities/multiple-check.entity';

import { CreateMultipleCheckDto } from './dto/create-multiple-check.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class MultipleCheckService {
  constructor(
    @InjectModel(MultipleCheck.name)
    private multipleCheckModel: Model<MultipleCheckDocument>,
  ) {}

  async create(userId: string, dto: CreateMultipleCheckDto) {
    try {
      const formattedChecks = dto.checks.map((item) => ({
        accountId: new Types.ObjectId(item.accountId),
        payeeId: new Types.ObjectId(item.payeeId),
        amount: item.amount,
        issueDate: new Date(item.issueDate),
        memo: item.memo || '',
        note: item.note || '',
        accountNumber: item.accountNumber || '',
        invoiceNumber: item.invoiceNumber || '',
        categoryId: item.categoryId
          ? new Types.ObjectId(item.categoryId)
          : undefined,
      }));

      const totalItem = formattedChecks.length;
      const totalAmount = formattedChecks.reduce(
        (sum, item) => sum + item.amount,
        0,
      );

      const created = await this.multipleCheckModel.create({
        userId: new Types.ObjectId(userId),
        selectBankAccount: new Types.ObjectId(dto.selectBankAccount),
        baseAmount: dto.baseAmount,
        date: new Date(dto.date),
        memo: dto.memo || '',
        selectCategory: dto.selectCategory
          ? new Types.ObjectId(dto.selectCategory)
          : undefined,
        checks: formattedChecks,
        totalItem,
        totalAmount,
      });

      return new CustomResponse(
        201,
        'Multiple check created successfully',
        created,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(userId: string) {
    try {
      const data = await this.multipleCheckModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Multiple checks fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid ID format');
      }

      const data = await this.multipleCheckModel.findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      });

      if (!data) {
        throw new CustomError(
          404,
          'Data not found or not authorized',
        );
      }

      return new CustomResponse(
        200,
        'Multiple check fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async delete(userId: string, id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid ID format');
      }

      const result = await this.multipleCheckModel.deleteOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      });

      if (!result.deletedCount) {
        throw new CustomError(
          404,
          'Data not found or not authorized',
        );
      }

      return new CustomResponse(
        200,
        'Deleted successfully',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }
}