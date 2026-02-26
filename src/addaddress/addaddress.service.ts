import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Addaddress,
  AddaddressDocument,
} from './entities/addaddress.entity';

import { CreateAddaddressDto } from './dto/create-addaddress.dto';
import { UpdateAddaddressDto } from './dto/update-addaddress.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AddaddressService {
  constructor(
    @InjectModel(Addaddress.name)
    private readonly addaddressModel: Model<AddaddressDocument>,
  ) {}

  async create(dto: CreateAddaddressDto, user: any) {
    try {

      // ✅ SAFE CHECK
      if (!user || !user.companyId || !user.userId) {
        throw new CustomError(401, 'Invalid user token data');
      }

      const address = await this.addaddressModel.create({
        ...dto,
        companyId: user.companyId,
        userId: user.userId,
      });

      return new CustomResponse(
        201,
        'Address created successfully',
        address,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(user: any) {
    try {

      if (!user || !user.companyId) {
        throw new CustomError(401, 'Invalid user token data');
      }

      const list = await this.addaddressModel.find({
        companyId: user.companyId,
      });

      return new CustomResponse(
        200,
        'Addresses fetched successfully',
        list,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findOne(id: string, user: any) {
    try {

      if (!user || !user.companyId) {
        throw new CustomError(401, 'Invalid user token data');
      }

      const address = await this.addaddressModel.findOne({
        _id: id,
        companyId: user.companyId,
      });

      if (!address) {
        throw new CustomError(404, 'Address not found');
      }

      return new CustomResponse(
        200,
        'Address fetched successfully',
        address,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async update(id: string, dto: UpdateAddaddressDto, user: any) {
    try {

      if (!user || !user.companyId) {
        throw new CustomError(401, 'Invalid user token data');
      }

      const updated = await this.addaddressModel.findOneAndUpdate(
        { _id: id, companyId: user.companyId },
        dto,
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Address not found');
      }

      return new CustomResponse(
        200,
        'Address updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async remove(id: string, user: any) {
    try {

      if (!user || !user.companyId) {
        throw new CustomError(401, 'Invalid user token data');
      }

      const deleted = await this.addaddressModel.findOneAndDelete({
        _id: id,
        companyId: user.companyId,
      });

      if (!deleted) {
        throw new CustomError(404, 'Address not found');
      }

      return new CustomResponse(
        200,
        'Address deleted successfully',
        deleted,
      );
    } catch (error) {
      throwException(error);
    }
  }
}