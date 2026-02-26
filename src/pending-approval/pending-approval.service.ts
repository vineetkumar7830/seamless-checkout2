import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PendingApproval,
  PendingApprovalDocument,
} from './entities/pending-approval.entity';
import { CreateApprovalDto } from './dto/create-pending-approval.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PendingApprovalService {
  constructor(
    @InjectModel(PendingApproval.name)
    private readonly approvalModel: Model<PendingApprovalDocument>,
  ) { }

  async create(dto: CreateApprovalDto, userId: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId: _, ...approvalData } = dto as any;

      const approval = await this.approvalModel.create({
        ...approvalData,
        requestedBy: userId,
        companyId: new Types.ObjectId(companyId),
        status: 'pending',
      });

      return new CustomResponse(
        201,
        'Approval request created successfully',
        approval,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async getPending(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const list = await this.approvalModel
        .find({ status: 'pending', companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Pending approvals fetched successfully',
        {
          total: list.length,
          approvals: list,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // GET APPROVAL BY ID
  async getById(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const approval = await this.approvalModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!approval) {
        throw new CustomError(404, 'Approval not found');
      }

      return new CustomResponse(
        200,
        'Approval fetched successfully',
        approval,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async action(
    id: string,
    status: 'approved' | 'rejected',
    userId: string,
    companyId: string,
    remarks?: string,
  ) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const approval = await this.approvalModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        {
          status,
          actionBy: userId,
          actionAt: new Date(),
          remarks,
        },
        { new: true },
      );
      if (!approval) {
        throw new CustomError(404, 'Approvvv')
      }
      if (!approval) {
        throw new CustomError(404, 'Approval not found');
      }

      return new CustomResponse(
        200,
        `Request ${status} successfully`,
        approval,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
