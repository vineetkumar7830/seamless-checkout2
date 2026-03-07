import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddCompany, AddCompanyDocument } from './entities/addcompany.entity';
import { CreateAddCompanyDto } from './dto/create-addcompany.dto';

@Injectable()
export class AddCompanyService {

  constructor(
    @InjectModel(AddCompany.name)
    private companyModel: Model<AddCompanyDocument>,
  ) {}

  async create(dto: CreateAddCompanyDto, userId: string) {

    const company = new this.companyModel({
      companyName: dto.companyName,
      userId: userId,
    });

    return company.save();
  }

  async findAll(userId: string) {
    return this.companyModel.find({ userId });
  }
}