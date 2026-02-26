import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CheckIssued,
  CheckIssuedDocument,
} from './entities/check-issued.entity';
import { CreateCheckIssuedDto } from './dto/create-check-issued.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CheckIssuedService {
  constructor(
    @InjectModel(CheckIssued.name)
    private readonly checkModel: Model<CheckIssuedDocument>,
  ) { }

  // ================= ISSUE CHECK =================
  async issueCheck(dto: CreateCheckIssuedDto, userId: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const exists = await this.checkModel.findOne({
        checkNumber: dto.checkNumber,
        companyId: new Types.ObjectId(companyId),
      });

      if (exists) {
        throw new CustomError(400, 'Check number already exists');
      }

      const check = await this.checkModel.create({
        ...dto,
        issuedBy: userId,
        companyId: new Types.ObjectId(companyId),
        status: 'issued',
      });

      return new CustomResponse(
        201,
        'Check issued successfully',
        check,
      );
    } catch (error: any) {
      if (error.code === 11000) {
        throwException(
          new CustomError(400, 'Check number already exists'),
        );
      }
      throwException(error);
    }
  }

  // ================= GET LIST =================
  async getIssuedChecks(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const list = await this.checkModel
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Issued checks fetched successfully',
        {
          total: list.length,
          checks: list,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GET BY ID =================
  async getCheckById(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const check = await this.checkModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check fetched successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE STATUS =================
  async updateStatus(id: string, status: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const check = await this.checkModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id), companyId: new Types.ObjectId(companyId) },
        { status, companyId: new Types.ObjectId(companyId) }, // ✅ Re-enforce companyId
        { new: true },
      );

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check status updated successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
