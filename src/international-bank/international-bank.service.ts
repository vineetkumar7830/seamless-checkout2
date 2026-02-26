import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  InternationalBank,
  InternationalBankDocument,
} from './entities/international-bank.entity';
import { CreateInternationalBankDto } from './dto/create-international-bank.dto';
import { UpdateInternationalBankDto } from './dto/update-international-bank.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class InternationalBankService {
  constructor(
    @InjectModel(InternationalBank.name)
    private bankModel: Model<InternationalBankDocument>,
  ) { }

  async create(dto: CreateInternationalBankDto, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const { companyId: _, ...bankData } = dto as any;

      const bank = await this.bankModel.create({
        ...bankData,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'International bank created successfully',
        bank,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const list = await this.bankModel.find({ companyId: new Types.ObjectId(companyId) });

      return new CustomResponse(
        200,
        'International banks fetched successfully',
        list,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.bankModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!data) {
        throw new CustomError(404, 'Record not found');
      }

      return new CustomResponse(
        200,
        'International bank fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async update(
    id: string,
    dto: UpdateInternationalBankDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const updated = await this.bankModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id), companyId: new Types.ObjectId(companyId) },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Record not found');
      }

      return new CustomResponse(
        200,
        'International bank updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

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
        'International bank deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
