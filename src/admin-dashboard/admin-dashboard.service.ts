import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.schema';
import { Company, CompanyDocument } from './entities/company.schema';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  // 📊 TOTAL DASHBOARD SUMMARY
  async getDashboardSummary() {
    try {
      const [
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalCompanies,
        activeCompanies,
        inactiveCompanies,
      ] = await Promise.all([
        this.userModel.countDocuments(),
        this.userModel.countDocuments({ isActive: true }),
        this.userModel.countDocuments({ isActive: false }),
        this.companyModel.countDocuments(),
        this.companyModel.countDocuments({ isActive: true }),
        this.companyModel.countDocuments({ isActive: false }),
      ]);

      return new CustomResponse(
        200,
        'Dashboard summary fetched successfully',
        {
          totalUsers,
          activeUsers,
          inactiveUsers,
          totalCompanies,
          activeCompanies,
          inactiveCompanies,
          
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel
        .find()
        .populate('companyId', 'name isActive')
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Users fetched successfully',
        {
          total: users.length,
          users,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  async getAllCompanies() {
    try {
      const companies = await this.companyModel
        .find()
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Companies fetched successfully',
        {
          total: companies.length,
          companies,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true },
      );

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      return new CustomResponse(
        200,
        `User ${isActive ? 'enabled' : 'disabled'} successfully`,
        user,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async updateCompanyStatus(companyId: string, isActive: boolean) {
    try {
      const company = await this.companyModel.findByIdAndUpdate(
        companyId,
        { isActive },
        { new: true },
      );

      if (!company) {
        throw new CustomError(404, 'Company not found');
      }

      await this.userModel.updateMany(
        { companyId: company._id },
        { isActive },
      );

      return new CustomResponse(
        200,
        `Company ${isActive ? 'enabled' : 'disabled'} successfully`,
        company,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
