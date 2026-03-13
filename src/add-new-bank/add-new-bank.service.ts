import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddNewBank, AddNewBankDocument } from './entities/add-new-bank.entity';
import { CreateAddNewBankDto } from './dto/create-add-new-bank.dto';

@Injectable()
export class AddNewBankService {

  constructor(
    @InjectModel(AddNewBank.name)
    private bankModel: Model<AddNewBankDocument>,
  ) {}

  async create(userId: string, dto: CreateAddNewBankDto) {

    if (dto.accountNumber !== dto.confirmAccountNumber) {
      throw new BadRequestException('Account number does not match');
    }

    const bank = await this.bankModel.create({
      userId,
      routingNumber: dto.routingNumber,
      accountNumber: dto.accountNumber,
      nameOnAccount: dto.nameOnAccount,
      nickName: dto.nickName,
      addressLine1: dto.addressLine1
    });

    return {
      message: "Bank account added successfully",
      data: bank
    };
  }

  async findAll(userId: string) {
    return this.bankModel.find({ userId });
  }

  async findOne(id: string) {
    return this.bankModel.findById(id);
  }

}