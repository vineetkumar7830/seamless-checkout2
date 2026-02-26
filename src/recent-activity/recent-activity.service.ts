import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RecentActivity } from './entities/recent-activity.entity';
import { CreateRecentActivityDto } from './dto/create-recent-activity.dto';
import { UpdateRecentActivityDto } from './dto/update-recent-activity.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class RecentActivityService {
  constructor(
    @InjectModel(RecentActivity.name)
    private activityModel: Model<RecentActivity>,
  ) { }

  // CREATE
  async create(dto: CreateRecentActivityDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const activity = await this.activityModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Recent activity created successfully',
        activity,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // GET ALL
  async findAll(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const activities = await this.activityModel
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Recent activities fetched successfully',
        activities,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // GET ONE
  async findOne(id: string, companyId: string) {
    try {
      const activity = await this.activityModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!activity) {
        throw new CustomError(404, 'Recent activity not found');
      }

      return new CustomResponse(
        200,
        'Recent activity fetched successfully',
        activity,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async update(id: string, dto: UpdateRecentActivityDto, companyId: string) {
    try {
      const updated = await this.activityModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Recent activity not found');
      }

      return new CustomResponse(
        200,
        'Recent activity updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // DELETE
  async delete(id: string, companyId: string) {
    try {
      const deleted = await this.activityModel.findOneAndDelete({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Recent activity not found');
      }

      return new CustomResponse(
        200,
        'Recent activity deleted successfully',
      );
    } catch (error) {
      throwException(error);
    }
  }
}
