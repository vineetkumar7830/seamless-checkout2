import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Tax, TaxDocument } from './entities/tax.entity';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Injectable()
export class TaxService {
  constructor(
    @InjectModel(Tax.name)
    private readonly taxModel: Model<TaxDocument>,
  ) {}

  // ===== CREATE TAX =====
  async create(dto: CreateTaxDto, companyId: string) {
    const exists = await this.taxModel.findOne({
      taxName: dto.taxName,
      companyId: new Types.ObjectId(companyId),
      isActive: true,
    });

    if (exists) {
      throw new BadRequestException('Tax already exists');
    }

    const tax = await this.taxModel.create({
      ...dto,
      companyId: new Types.ObjectId(companyId),
    });

    return {
      status: true,
      message: 'Tax added successfully',
      result: tax,
    };
  }

  // ===== GET ALL TAX =====
  async findAll(companyId: string) {
    const data = await this.taxModel
      .find({
        companyId: new Types.ObjectId(companyId),
        isActive: true,
      })
      .sort({ createdAt: -1 });

    return {
      status: true,
      count: data.length,
      result: data,
    };
  }

  // ===== GET SINGLE TAX =====
  async findOne(id: string, companyId: string) {
    const tax = await this.taxModel.findOne({
      _id: id,
      companyId: new Types.ObjectId(companyId),
    });

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return {
      status: true,
      result: tax,
    };
  }

  // ===== UPDATE TAX =====
  async update(id: string, dto: UpdateTaxDto, companyId: string) {
    const tax = await this.taxModel.findOneAndUpdate(
      {
        _id: id,
        companyId: new Types.ObjectId(companyId),
      },
      dto,
      { new: true },
    );

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return {
      status: true,
      message: 'Tax updated successfully',
      result: tax,
    };
  }

  // ===== DELETE TAX (SOFT DELETE) =====
  async remove(id: string, companyId: string) {
    const tax = await this.taxModel.findOneAndUpdate(
      {
        _id: id,
        companyId: new Types.ObjectId(companyId),
      },
      { isActive: false },
      { new: true },
    );

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return {
      status: true,
      message: 'Tax deleted successfully',
    };
  }
}