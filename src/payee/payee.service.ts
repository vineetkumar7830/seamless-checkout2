import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payee, PayeeDocument } from './entities/payee.entity';
import { CreatePayeeDto } from './dto/create-payee.dto';
import { UpdatePayeeDto } from './dto/update-payee.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PayeeService {
  constructor(
    @InjectModel(Payee.name)
    private readonly payeeModel: Model<PayeeDocument>,
  ) { }

  async create(dto: CreatePayeeDto, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId: _, ...payeeData } = dto as any;

      const payee = await this.payeeModel.create({
        ...payeeData,
        companyId: new Types.ObjectId(companyId),
      });
      return new CustomResponse(201, 'Payee created successfully', payee);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const payees = await this.payeeModel.find({
        companyId: new Types.ObjectId(companyId),
      }).exec();
      return new CustomResponse(200, 'Payees fetched successfully', payees);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const payee = await this.payeeModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      }).exec();
      if (!payee) throw new CustomError(404, 'Payee not found');

      return new CustomResponse(200, 'Payee fetched successfully', payee);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async update(id: string, dto: UpdatePayeeDto, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const updatedPayee = await this.payeeModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      ).exec();

      if (!updatedPayee) throw new CustomError(404, 'Payee not found');

      return new CustomResponse(200, 'Payee updated successfully', updatedPayee);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async remove(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const deletedPayee = await this.payeeModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      }).exec();
      if (!deletedPayee) throw new CustomError(404, 'Payee not found');

      return new CustomResponse(200, 'Payee deleted successfully', null);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
