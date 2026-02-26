import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  CompanySwitcher,
  CompanySwitcherDocument,
} from './entities/company-switcher.entity';

import { CreateCompanySwitcherDto } from './dto/create-company-switcher.dto';
import { SwitchCompanyDto } from './dto/set-active-company.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CompanySwitcherService {
  constructor(
    @InjectModel(CompanySwitcher.name)
    private readonly model: Model<CompanySwitcherDocument>,
  ) {}

  // ================= CREATE =================
  async createCompany(dto: CreateCompanySwitcherDto, userId: string) {
    try {
      const userObjectId = new Types.ObjectId(userId);

      const companyCount = await this.model.countDocuments({
        userId: userObjectId,
      });

      const company = await this.model.create({
        ...dto,
        userId: userObjectId,
        isActive: companyCount === 0,
        lastActiveAt: companyCount === 0 ? new Date() : null,
      });

      return new CustomResponse(
        201,
        'Company created successfully',
        company,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= LIST =================
  async getCompanies(userId: string) {
    try {
      const companies = await this.model.find({
        userId: new Types.ObjectId(userId),
      });

      return new CustomResponse(
        200,
        'Company list fetched successfully',
        companies,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= SWITCH =================
  async switchCompany(dto: SwitchCompanyDto, userId: string) {
    try {
      const userObjectId = new Types.ObjectId(userId);

      await this.model.updateMany(
        { userId: userObjectId },
        { isActive: false },
      );

      const activeCompany = await this.model.findOneAndUpdate(
        {
          userId: userObjectId,
          companyId: dto.companyId,
        },
        {
          isActive: true,
          lastActiveAt: new Date(),
        },
        { new: true },
      );

      if (!activeCompany) {
        throw new CustomError(404, 'Company not found');
      }

      return new CustomResponse(
        200,
        'Company switched successfully',
        activeCompany,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= ACTIVE =================
  async getActiveCompany(userId: string) {
    try {
      const company = await this.model.findOne({
        userId: new Types.ObjectId(userId),
        isActive: true,
      });

      if (!company) {
        throw new CustomError(404, 'No active company found');
      }

      return new CustomResponse(
        200,
        'Active company fetched successfully',
        company,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= LOGOUT =================
  async handleCompanyOnLogout(userId: string) {
    try {
      const userObjectId = new Types.ObjectId(userId);

      const activeCompany = await this.model.findOne({
        userId: userObjectId,
        isActive: true,
      });

      if (activeCompany) {
        await this.model.updateOne(
          { _id: activeCompany._id },
          { isActive: false },
        );
      }

      const fallbackCompany = await this.model
        .findOne({
          userId: userObjectId,
          isActive: false,
        })
        .sort({ lastActiveAt: -1 });

      if (fallbackCompany) {
        await this.model.updateOne(
          { _id: fallbackCompany._id },
          {
            isActive: true,
            lastActiveAt: new Date(),
          },
        );
      }

      return new CustomResponse(
        200,
        'Company state updated on logout',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
