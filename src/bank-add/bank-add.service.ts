import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BankAdd, BankAddDocument } from './entities/bank-add.entity';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class BankAddService {
  constructor(
    @InjectModel(BankAdd.name)
    private bankModel: Model<BankAddDocument>,
  ) { }

  // ================= CREATE =================
  async create(data: any, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId: _, ...bankData } = data as any;

      const record = await this.bankModel.create({
        ...bankData,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Bank record created successfully',
        record,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET ALL =================
  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const records = await this.bankModel.find({
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        200,
        'Bank records fetched successfully',
        records,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET ONE =================
  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const record = await this.bankModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!record) {
        throw new CustomError(404, 'Record not found');
      }

      return new CustomResponse(
        200,
        'Bank record fetched successfully',
        record,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= UPDATE =================
  async update(id: string, data: any, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const updated = await this.bankModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { ...data, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Record not found');
      }

      return new CustomResponse(
        200,
        'Bank record updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= DELETE =================
  async remove(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const deleted = await this.bankModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Record not found');
      }

      return new CustomResponse(
        200,
        'Bank record deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
