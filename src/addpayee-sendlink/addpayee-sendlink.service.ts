import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CustomError from 'src/provider/customer-error.service';
import { randomUUID } from 'crypto';

import { SendLinkPayee, SendLinkPayeeDocument } from './entities/addpayee-sendlink.entity';
import { CreateSendLinkDto } from './dto/create-addpayee-sendlink.dto';
import { UpdateSendLinkStatusDto } from './dto/update-addpayee-sendlink.dto';

@Injectable()
export class AddPayeeSendLinkService {
  constructor(
    @InjectModel(SendLinkPayee.name)
    private model: Model<SendLinkPayeeDocument>,
  ) { }

  
  async send(dto: CreateSendLinkDto, companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const token = randomUUID();
    const shareLink = `https://app.example.com/payee/add/${token}`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { companyId: _, ...payeeData } = dto as any;

    const data = await this.model.create({
      ...payeeData,
      companyId: new Types.ObjectId(companyId),
      addMode: 'sendLink',
      shareLink,
      status: 'sent',
    });

    return {
      status: true,
      message: 'Payee link sent successfully',
      result: data,
    };
  }

  // ✅ LIST (by companyId)
  async list(companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const data = await this.model.find({
      companyId: new Types.ObjectId(companyId),
    }).sort({ createdAt: -1 });

    return {
      status: true,
      message: 'Send link payees fetched',
      result: data,
    };
  }

  // ✅ GET ONE (FIXED)
  async getOne(id: string, companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const data = await this.model.findOne({
      _id: new Types.ObjectId(id),
      companyId: new Types.ObjectId(companyId),
    });

    if (!data) {
      return {
        status: false,
        message: 'Send link payee not found',
        result: null,
      };
    }

    return {
      status: true,
      message: 'Send link payee fetched',
      result: data,
    };
  }

  // ✅ UPDATE (FIXED)
  async update(id: string, dto: UpdateSendLinkStatusDto, companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const updated = await this.model.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      },
      { ...dto, companyId: new Types.ObjectId(companyId) },
      { new: true },
    );

    if (!updated) {
      return {
        status: false,
        message: 'Send link payee not found for this company',
        result: null,
      };
    }

    return {
      status: true,
      message: 'Send link payee updated',
      result: updated,
    };
  }

  // ✅ DELETE (FIXED)
  async remove(id: string, companyId: string) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }
    const deleted = await this.model.findOneAndDelete({
      _id: new Types.ObjectId(id),
      companyId: new Types.ObjectId(companyId),
    });

    if (!deleted) {
      return {
        status: false,
        message: 'Send link payee not found for this company',
        result: null,
      };
    }

    return {
      status: true,
      message: 'Send link payee deleted',
      result: deleted,
    };
  }
}
