import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Company, CompanyDocument } from '../company-management/entities/company-management.entity';
import { CreateAddCompanyDto } from './dto/create-addcompany.dto';

@Injectable()
export class AddCompanyService {

  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) { }

  async create(dto: CreateAddCompanyDto, userId: string) {

    const company = new this.companyModel({
      companyName: dto.companyName,
      userId: new Types.ObjectId(userId),
    });

    return company.save();
  }

  async findAll(userId: string) {
    return this.companyModel.find({ userId: new Types.ObjectId(userId) });
  }
}