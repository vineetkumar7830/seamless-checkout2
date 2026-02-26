import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CompanyLimit,
  CompanyLimitDocument,
} from './entities/company-limit.entity';
import { CreateCompanyLimitDto } from './dto/create-company-limit.dto';
import { UpdateCompanyLimitDto } from './dto/update-company-limit.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CompanyLimitsService {
  constructor(
    @InjectModel(CompanyLimit.name)
    private limitModel: Model<CompanyLimitDocument>,
  ) { }

  // ================= CREATE =================
  async create(dto: CreateCompanyLimitDto) {
    try {
      if (!dto.companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const limit = new this.limitModel({
        ...dto,
        companyId: new Types.ObjectId(dto.companyId),
      });
      const saved = await limit.save();

      return new CustomResponse(
        201,
        'Company limit created successfully',
        saved,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ALL =================
  async findAll() {
    try {

      const limits = await this.limitModel.find().sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Company limits fetched successfully',
        limits,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND BY COMPANY =================
  async findByCompany(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const limit = await this.limitModel.findOne({
        companyId: new Types.ObjectId(companyId),
      });

      if (!limit) {
        throw new CustomError(404, 'Company limit not found');
      }
      return new CustomResponse(
        200,
        'Company limit fetched successfully',
        limit,
      );
      return new CustomResponse(
        200,
        'Company limit fetched successfully',
        limit,
      );
    } catch (error) {
      throwException(error);
    }
  }


  async update(companyId: string, dto: UpdateCompanyLimitDto) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const limit = await this.limitModel.findOneAndUpdate(
        { companyId: new Types.ObjectId(companyId) },
        dto,
        { new: true },
      );

      if (!limit) {
        throw new CustomError(404, 'Company limit not found');
      }

      return new CustomResponse(
        200,
        'Company limit updated successfully',
        limit,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= DELETE =================
  async delete(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const limit = await this.limitModel.findOneAndDelete({
        companyId: new Types.ObjectId(companyId),
      });

      if (!limit) {
        throw new CustomError(404, 'Company limit not found');
      }

      return new CustomResponse(
        200,
        'Company limit deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
