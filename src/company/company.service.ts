import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Company, CompanyDocument } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { SaaSPlan, SaaSPlanDocument } from '../plan/entities/plan.schema';
import { SaaSAddOn, SaaSAddOnDocument } from '../plan/entities/addon.schema';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel('User')
    private readonly userModel: Model<any>,

    @InjectModel(SaaSPlan.name)
    private readonly planModel: Model<SaaSPlanDocument>,

    @InjectModel(SaaSAddOn.name)
    private readonly addonModel: Model<SaaSAddOnDocument>,

    private readonly authService: AuthService,
  ) {}

  // ================= CREATE COMPANY =================
  async create(
    dto: CreateCompanyDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
    userId: string,
  ) {
    try {
      const exists = await this.companyModel.findOne({ email: dto.email });
      if (exists) throw new CustomError(400, 'Company already exists');

      // ✅ Base URL
      const baseUrl = process.env.BASE_URL || 'http://localhost:9000';

      // ✅ Full Image URL
      const logoUrl = files?.logo?.[0]
        ? `${baseUrl}/uploads/company/${files.logo[0].filename}`
        : null;

      const signatureUrl = files?.signature?.[0]
        ? `${baseUrl}/uploads/company/${files.signature[0].filename}`
        : null;

      const newCompany = new this.companyModel({
        ...dto,
        logoUrl,
        signatureUrl,
        userId,
      });

      newCompany.companyId = newCompany._id as any;

      const company = await newCompany.save();

      await this.userModel.findByIdAndUpdate(userId, {
        companyId: company._id,
      });

      const tokens = await this.authService.refreshUserToken(userId);

      return new CustomResponse(201, 'Company created successfully', {
        company,
        ...tokens,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GET ALL =================
  async findAll(userId: string) {
    try {
      const companies = await this.companyModel.find({
        userId,
        isActive: true,
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

  // ================= GET ONE =================
  async findOne(id: string, userId: string) {
    try {
      const company = await this.companyModel.findOne({
        _id: id,
        userId,
      });

      if (!company) throw new CustomError(404, 'Company not found');

      return new CustomResponse(200, 'Company fetched', company);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE =================
  async update(
    id: string,
    dto: UpdateCompanyDto,
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
    userId: string,
  ) {
    try {
      // ✅ Base URL
      const baseUrl = process.env.BASE_URL || 'http://localhost:9000';

      const updateData: any = { ...dto };

      // ✅ Update URLs if files are uploaded
      if (files?.logo?.[0]) {
        updateData.logoUrl = `${baseUrl}/uploads/company/${files.logo[0].filename}`;
      }

      if (files?.signature?.[0]) {
        updateData.signatureUrl = `${baseUrl}/uploads/company/${files.signature[0].filename}`;
      }

      const company = await this.companyModel.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true },
      );

      if (!company) throw new CustomError(404, 'Company not found');

      return new CustomResponse(200, 'Company updated', company);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= DELETE =================
  async remove(id: string, userId: string) {
    try {
      const company = await this.companyModel.findOneAndUpdate(
        { _id: id, userId },
        { isActive: false },
        { new: true },
      );

      if (!company) throw new CustomError(404, 'Company not found');

      return new CustomResponse(200, 'Company deleted', null);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= SWITCH COMPANY =================
  async switchCompany(companyId: string, userId: string) {
    try {
      const company = await this.companyModel.findOne({
        _id: companyId,
        userId,
      });

      if (!company)
        throw new CustomError(403, 'Unauthorized company switch');

      await this.userModel.findByIdAndUpdate(userId, {
        companyId: company._id,
      });

      const tokens = await this.authService.refreshUserToken(userId);

      return new CustomResponse(200, 'Company switched successfully', {
        company,
        ...tokens,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= ACTIVE COMPANY =================
  async getActiveCompany(companyId: string) {
    try {
      const company = await this.companyModel
        .findById(companyId)
        .populate('userId')
        .lean();

      if (!company) throw new CustomError(404, 'Company not found');

      return new CustomResponse(
        200,
        'Company fetched successfully',
        company,
      );
    } catch (error) {
      throwException(error);
    }
  }
}