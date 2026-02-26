import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BankInfo } from './entities/bank-info.entity';
import { CreateBankInfoDto } from './dto/create-bank-info.dto';
import { UpdateBankInfoDto } from './dto/update-bank-info.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class BankInfoService {
  constructor(
    @InjectModel(BankInfo.name)
    private bankModel: Model<BankInfo>,
  ) { }

  // 🔐 Mask account number
  maskAccountNumber(accountNumber: string): string {
    const last4 = accountNumber.slice(-4);
    return '**** **** ' + last4;
  }

  // ================= CREATE ================= //
  async create(dto: CreateBankInfoDto, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.bankModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Bank info created successfully',
        data,
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
      const data = await this.bankModel.find({
        companyId: new Types.ObjectId(companyId),
      });

      const maskedData = data.map((item) => ({
        id: item._id,
        bankName: item.bankName,
        accountNumber: this.maskAccountNumber(item.accountNumber),
        routingNumber: item.routingNumber,
        verificationStatus: item.verificationStatus,
      }));

      return new CustomResponse(
        200,
        'Bank info fetched successfully',
        maskedData,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      const data = await this.bankModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!data) {
        throw new CustomError(404, 'Bank info not found');
      }

      return new CustomResponse(
        200,
        'Bank info fetched successfully',
        {
          id: data._id,
          bankName: data.bankName,
          accountNumber: this.maskAccountNumber(data.accountNumber),
          routingNumber: data.routingNumber,
          verificationStatus: data.verificationStatus,
        },
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= UPDATE =================
  async update(id: string, dto: UpdateBankInfoDto, companyId: string): Promise<CustomResponse> {
    try {
      const updated = await this.bankModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Bank info not found');
      }

      return new CustomResponse(
        200,
        'Bank info updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= DELETE =================
  async delete(id: string, companyId: string): Promise<CustomResponse> {
    try {
      const deleted = await this.bankModel.findOneAndDelete({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Bank info not found');
      }

      return new CustomResponse(
        200,
        'Bank info deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
