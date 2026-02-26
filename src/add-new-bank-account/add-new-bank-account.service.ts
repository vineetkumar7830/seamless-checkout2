import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  AddNewBankAccount,
  AddNewBankAccountDocument,
  CountryType,
} from './entities/add-new-bank-account.entity';

import { CreateBankAccountDto } from './dto/create-add-new-bank-account.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AddNewBankAccountService {
  constructor(
    @InjectModel(AddNewBankAccount.name)
    private bankModel: Model<AddNewBankAccountDocument>,
  ) {}

  async create(
    userId: string,
    companyId: string,
    dto: CreateBankAccountDto,
  ) {
    try {
      if (
        dto.country === CountryType.USA &&
        !dto.routingNumber
      ) {
        throw new CustomError(
          400,
          'Routing number required for USA',
        );
      }

      if (
        dto.country === CountryType.CANADA &&
        (!dto.transitNumber ||
          !dto.financialInstitutionNumber)
      ) {
        throw new CustomError(
          400,
          'Transit & Financial Institution No required for Canada',
        );
      }

      if (
        dto.accountNumber !== dto.confirmAccountNumber
      ) {
        throw new CustomError(
          400,
          'Account numbers do not match',
        );
      }

      const created = await this.bankModel.create({
        ...dto,
        userId: new Types.ObjectId(userId),
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Bank account added successfully',
        created,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(userId: string, companyId: string) {
    try {
      const data = await this.bankModel.find({
        userId: new Types.ObjectId(userId),
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        200,
        'Bank accounts fetched successfully',
        data,
      );
    } catch (error) {
      throwException(error);
    }
  }
}