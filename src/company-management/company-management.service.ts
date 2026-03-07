import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Company, CompanyDocument } from './entities/company-management.entity';
import { UpdateCompanyDto } from './dto/update-company-management.dto';
import { CreateCompanyDto } from './dto/create-company-management.dto';

@Injectable()
export class CompanyManagementService {

  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  // ⭐ CREATE COMPANY (EDITED)
  async create(userId: string, dto: CreateCompanyDto) {

    const company = new this.companyModel({
      userId: new Types.ObjectId(userId),
      ...dto,
    });

    return company.save();
  }

  // GET ALL COMPANIES
  async findAll(userId: string) {

    return this.companyModel.find({
      userId: new Types.ObjectId(userId),
    });
  }

  // GET SINGLE COMPANY
  async findOne(companyId: string, userId: string) {

    const company = await this.companyModel.findOne({
      _id: companyId,
      userId: new Types.ObjectId(userId),
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  // UPDATE COMPANY + LOGO
  async update(companyId: string, userId: string, dto: UpdateCompanyDto, logo?: string) {

    const updateData: any = {
      ...dto,
    };

    if (logo) {
      updateData.logo = logo;
    }

    const company = await this.companyModel.findOneAndUpdate(
      {
        _id: companyId,
        userId: new Types.ObjectId(userId),
      },
      updateData,
      { new: true },
    );

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  // DELETE COMPANY
  async remove(companyId: string, userId: string) {

    return this.companyModel.findOneAndDelete({
      _id: companyId,
      userId: new Types.ObjectId(userId),
    });
  }
}