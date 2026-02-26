import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserProfile, UserProfileDocument } from './entities/user-profile.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private readonly profileModel: Model<UserProfileDocument>,
  ) { }

  // ================= CREATE =================
  async create(dto: any): Promise<CustomResponse> {
    try {
      const profile = await this.profileModel.create(dto);

      return new CustomResponse(
        201,
        'User profile created successfully',
        profile,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET BY USER + COMPANY =================
  async findByUserAndCompany(
    userId: string,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      const profile = await this.profileModel.findOne({
        userId,
        companyId,
      });

      if (!profile) {
        throw new CustomError(404, 'Profile not found');
      }

      return new CustomResponse(
        200,
        'User profile fetched successfully',
        profile,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= UPDATE BY USER + COMPANY =================
  async updateByUserAndCompany(
    userId: string,
    companyId: string,
    dto: UpdateUserProfileDto,
  ): Promise<CustomResponse> {
    try {
      const updated = await this.profileModel.findOneAndUpdate(
        { userId, companyId },
        { ...dto, userId, companyId }, // ✅ Force both userId and companyId
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Profile not found');
      }

      return new CustomResponse(
        200,
        'User profile updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
