import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Item } from './entities/add-item.entity';
import { CreateAddItemDto } from './dto/create-add-item.dto';
import { UpdateAddItemDto } from './dto/update-add-item.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AddItemService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) { }

  // ================= CREATE =================
  async create(
    dto: CreateAddItemDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (dto.trackProduct && dto.stockQuantity <= 0) {
        throw new CustomError(
          400,
          'Stock quantity must be greater than 0 when tracking product',
        );
      }

      const item = await this.itemModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Item added successfully',
        item,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= LIST =================
  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const items = await this.itemModel.find({
        companyId: new Types.ObjectId(companyId),
        isActive: true,
      });

      return new CustomResponse(
        200,
        'Items fetched successfully',
        items,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET ONE =================
  async findOne(
    id: string,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid item id');
      }

      const item = await this.itemModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!item) {
        throw new CustomError(404, 'Item not found');
      }

      return new CustomResponse(
        200,
        'Item fetched successfully',
        item,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= UPDATE =================
  async update(
    id: string,
    dto: UpdateAddItemDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid item id');
      }

      const item = await this.itemModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!item) {
        throw new CustomError(404, 'Item not found');
      }

      return new CustomResponse(
        200,
        'Item updated successfully',
        item,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= DELETE (SOFT) =================
  async remove(
    id: string,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid item id');
      }

      const item = await this.itemModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { isActive: false },
        { new: true },
      );

      if (!item) {
        throw new CustomError(404, 'Item not found');
      }

      return new CustomResponse(
        200,
        'Item deleted successfully',
        item,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
