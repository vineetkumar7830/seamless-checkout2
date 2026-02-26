import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PayeeDetails,
  PayeeDetailsDocument,
} from './entities/payee-detail.entity';
import { CreatePayeeDetailsDto } from './dto/create-payee-detail.dto';
import { UpdatePayeeDetailsDto } from './dto/update-payee-detail.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PayeeDetailsService {
  constructor(
    @InjectModel(PayeeDetails.name)
    private model: Model<PayeeDetailsDocument>,
  ) { }

  // ================= CREATE =================
  async create(
    dto: CreatePayeeDetailsDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.model.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Payee details created successfully',
        data,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= LIST =================
  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.model
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Payee details fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET ONE =================
  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      const data = await this.model.findOne({ _id: id, companyId: new Types.ObjectId(companyId) });

      if (!data) {
        throw new CustomError(404, 'Payee details not found');
      }

      return new CustomResponse(
        200,
        'Payee details fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async update(
    id: string,
    dto: UpdatePayeeDetailsDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      const updated = await this.model.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Payee details not found');
      }

      return new CustomResponse(
        200,
        'Payee details updated successfully',
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
      const deleted = await this.model.findOneAndDelete({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Payee details not found');
      }

      return new CustomResponse(
        200,
        'Payee details deleted successfully',
        deleted,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
