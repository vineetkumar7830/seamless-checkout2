import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BlankCheck, BlankCheckDocument } from './entities/blank-check.entity';
import { CreateBlankCheckDto } from './dto/create-blank-check.dto';
import { UpdateBlankCheckDto } from './dto/update-blank-check.dto';

@Injectable()
export class BlankChecksService {

  constructor(
    @InjectModel(BlankCheck.name)
    private blankCheckModel: Model<BlankCheckDocument>,
  ) {}

  // CREATE
  async create(dto: CreateBlankCheckDto, user: any) {

    const payload: any = {
      userId: new Types.ObjectId(user?._id || user?.id),
      companyId: new Types.ObjectId(user?.companyId),
      bankAccountId: new Types.ObjectId(dto.bankAccountId),
      numberOfChecks: dto.numberOfChecks,
      includeSignature: dto.includeSignature ?? true,
    };

    if (dto.categoryId) {
      payload.categoryId = new Types.ObjectId(dto.categoryId);
    }

    const data = await this.blankCheckModel.create(payload);

    return {
      message: 'Blank check created successfully',
      data,
    };
  }

  // LIST
  async findAll(user: any, page = 1, limit = 10) {

    const skip = (page - 1) * limit;

    const data = await this.blankCheckModel
      .find({
        companyId: new Types.ObjectId(user?.companyId),
      })
      .populate('bankAccountId')
      .populate('categoryId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await this.blankCheckModel.countDocuments({
      companyId: new Types.ObjectId(user?.companyId),
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }

  // SINGLE
  async findOne(id: string, user: any) {

    const data = await this.blankCheckModel.findOne({
      _id: new Types.ObjectId(id),
      companyId: new Types.ObjectId(user?.companyId),
    });

    if (!data) {
      throw new NotFoundException('Blank check not found');
    }

    return data;
  }

  // UPDATE
  async update(id: string, dto: UpdateBlankCheckDto, user: any) {

    const payload: any = { ...dto };

    if (dto.bankAccountId) {
      payload.bankAccountId = new Types.ObjectId(dto.bankAccountId);
    }

    if (dto.categoryId) {
      payload.categoryId = new Types.ObjectId(dto.categoryId);
    }

    const data = await this.blankCheckModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(user?.companyId),
      },
      payload,
      { new: true },
    );

    if (!data) {
      throw new NotFoundException('Blank check not found');
    }

    return {
      message: 'Blank check updated successfully',
      data,
    };
  }

  // DELETE
  async remove(id: string, user: any) {

    const data = await this.blankCheckModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      companyId: new Types.ObjectId(user?.companyId),
    });

    if (!data) {
      throw new NotFoundException('Blank check not found');
    }

    return {
      message: 'Blank check deleted successfully',
    };
  }
}