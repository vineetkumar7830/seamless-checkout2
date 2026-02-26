import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  DepositSlip,
  DepositSlipDocument,
  DepositStatus,
} from './entities/deposit-slip.entity';

import { CreateDepositSlipDto } from './dto/create-deposit-slip.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class DepositSlipService {
  constructor(
    @InjectModel(DepositSlip.name)
    private readonly depositModel: Model<DepositSlipDocument>,
  ) {}

  // ✅ CREATE
  async create(companyId: string, dto: CreateDepositSlipDto) {
    try {
      let depositFromObjectId: Types.ObjectId | undefined;

      if (dto.depositFromId && Types.ObjectId.isValid(dto.depositFromId)) {
        depositFromObjectId = new Types.ObjectId(dto.depositFromId);
      }

      const cashEntries = dto.cashEntries.map((item) => {
        let cashierObjectId: Types.ObjectId | undefined;

        if (item.cashierClerk && Types.ObjectId.isValid(item.cashierClerk)) {
          cashierObjectId = new Types.ObjectId(item.cashierClerk);
        }

        return {
          amount: item.amount,
          cashierClerk: cashierObjectId,
          note: item.note,
          type: item.type ?? 'CASH',
        };
      });

      const checkEntries = dto.checkEntries.map((item) => {
        let fromObjectId: Types.ObjectId | undefined;
        let cashierObjectId: Types.ObjectId | undefined;

        if (item.from && Types.ObjectId.isValid(item.from)) {
          fromObjectId = new Types.ObjectId(item.from);
        }

        if (item.cashierClerk && Types.ObjectId.isValid(item.cashierClerk)) {
          cashierObjectId = new Types.ObjectId(item.cashierClerk);
        }

        return {
          amount: item.amount,
          from: fromObjectId,
          checkNumber: item.checkNumber,
          cashierClerk: cashierObjectId,
          note: item.note,
          type: item.type ?? 'Business Check',
        };
      });

      const deposit = await this.depositModel.create({
        companyId,
        bankAccountId: dto.bankAccountId,
        depositFromId: depositFromObjectId,
        depositFromName: dto.depositFromName,
        date: new Date(dto.date),
        refId: dto.refId,
        memo: dto.memo,
        blankDepositSlip: dto.blankDepositSlip,
        cashEntries,
        checkEntries,
        status: DepositStatus.UNVERIFIED,
      });

      return new CustomResponse(
        201,
        'Deposit slip created successfully',
        deposit,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(companyId: string, status?: DepositStatus) {
    try {
      const filter: any = { companyId };
      if (status) filter.status = status;

      const slips = await this.depositModel
        .find(filter)
        .populate('depositFromId');

      return new CustomResponse(
        200,
        'Deposit slips fetched successfully',
        slips,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async verify(id: string, companyId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const slip = await this.depositModel.findOneAndUpdate(
        { _id: id, companyId },
        {
          status: DepositStatus.VERIFIED,
          verifiedBy: new Types.ObjectId(userId),
          verifiedDate: new Date(),
        },
        { new: true },
      );

      if (!slip) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      return new CustomResponse(
        200,
        'Deposit slip verified successfully',
        slip,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async void(id: string, companyId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const slip = await this.depositModel.findOneAndUpdate(
        { _id: id, companyId },
        {
          status: DepositStatus.VOIDED,
          voidedBy: new Types.ObjectId(userId),
          voidedDate: new Date(),
        },
        { new: true },
      );

      if (!slip) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      return new CustomResponse(
        200,
        'Deposit slip voided successfully',
        slip,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async delete(id: string, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const deleted = await this.depositModel.findOneAndDelete({
        _id: id,
        companyId,
      });

      if (!deleted) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      return new CustomResponse(
        200,
        'Deposit slip deleted successfully',
        deleted,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async addComment(
    id: string,
    companyId: string,
    userId: string,
    comment: string,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const updated = await this.depositModel.findOneAndUpdate(
        { _id: id, companyId },
        {
          $push: {
            comments: {
              user: new Types.ObjectId(userId),
              comment,
              createdAt: new Date(),
            },
          },
        },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      return new CustomResponse(
        200,
        'Comment added successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async addAttachment(
    id: string,
    companyId: string,
    userId: string,
    file: Express.Multer.File,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const updated = await this.depositModel.findOneAndUpdate(
        { _id: id, companyId },
        {
          $push: {
            attachments: {
              fileName: file.filename,
              fileUrl: `/uploads/deposit-slip/${file.filename}`,
              uploadedBy: new Types.ObjectId(userId),
              uploadedAt: new Date(),
            },
          },
        },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      return new CustomResponse(
        200,
        'Attachment added successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async print(id: string, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(404, 'Invalid Deposit ID');
      }

      const slip = await this.depositModel
        .findOne({ _id: id, companyId })
        .populate('depositFromId');

      if (!slip) {
        throw new CustomError(404, 'Deposit Slip not found');
      }

      const totalCash = slip.cashEntries.reduce(
        (sum, item) => sum + item.amount,
        0,
      );

      const totalCheck = slip.checkEntries.reduce(
        (sum, item) => sum + item.amount,
        0,
      );

      return new CustomResponse(
        200,
        'Deposit slip print data fetched successfully',
        {
          slip,
          totals: {
            totalCash,
            totalCheck,
            grandTotal: totalCash + totalCheck,
          },
        },
      );
    } catch (error) {
      throwException(error);
    }
  }
}
