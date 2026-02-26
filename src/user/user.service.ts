import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  async create(dto: CreateUserDto) {
    try {
      const exists = await this.userModel.findOne({ email: dto.email });

      if (exists) {
        throw new CustomError(400, 'Email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userModel.create({
        ...dto,
        password: hashedPassword,
      });

      return new CustomResponse(
        201,
        'User created successfully',
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(companyId: string) {
    try {
      const users = await this.userModel.find({ companyId: new Types.ObjectId(companyId) }).select('-password');

      return new CustomResponse(
        200,
        'Users fetched successfully',
        users,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findOne(id: string, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid user id');
      }

      const user = await this.userModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      }).select('-password');

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      return new CustomResponse(
        200,
        'User fetched successfully',
        user,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async update(id: string, dto: UpdateUserDto, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid user id');
      }

      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      }

      const user = await this.userModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      return new CustomResponse(
        200,
        'User updated successfully',
        {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }

  // DELETE USER
  async remove(id: string, companyId: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid user id');
      }

      const user = await this.userModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      return new CustomResponse(
        200,
        'User deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
