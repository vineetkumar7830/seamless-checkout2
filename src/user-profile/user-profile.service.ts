import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserProfile, UserProfileDocument } from './entities/user-profile.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { User, UserDocument } from 'src/user/entities/user.entity';

import CustomResponse from 'src/provider/custom-response.service';
import CustomError from 'src/provider/customer-error.service';

@Injectable()
export class UserProfileService {

  constructor(
    @InjectModel(UserProfile.name)
    private readonly profileModel: Model<UserProfileDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ================= GET PROFILE =================
  async findByUser(
    userId: string,
    email: string,
    firstName: string,
  ): Promise<CustomResponse> {

    let profile = await this.profileModel.findOne({ userId });

    if (!profile) {

      profile = await this.profileModel.create({
        userId,
        email: email || '',
        firstName: firstName || 'User',
      });

    }

    return new CustomResponse(
      200,
      'User profile fetched successfully',
      profile,
    );
  }

  // ================= UPDATE PROFILE =================
  async updateByUser(
    userId: string,
    email: string,
    firstName: string,
    dto: UpdateUserProfileDto,
  ): Promise<CustomResponse> {

    let profile = await this.profileModel.findOne({ userId });

    if (!profile) {

      profile = await this.profileModel.create({
        ...dto,
        userId,
        email: email || '',
        firstName: firstName || 'User',
      });

    } else {

      profile = await this.profileModel.findOneAndUpdate(
        { userId },
        { $set: dto },
        { new: true },
      );

    }

    return new CustomResponse(
      200,
      'User profile updated successfully',
      profile,
    );
  }

  // ================= CHANGE PASSWORD =================
  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ): Promise<CustomResponse> {

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const isMatch = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new CustomError(400, 'Old password incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new CustomError(400, 'Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return new CustomResponse(
      200,
      'Password updated successfully',
      null,
    );
  }
}