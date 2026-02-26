import { Injectable, BadRequestException } from '@nestjs/common';
import CustomError from 'src/provider/customer-error.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PaymentSetting,
  PaymentSettingDocument,
} from './entities/payment-setting.entity';
import { CreatePaymentSettingDto } from './dto/create-payment-setting.dto';

@Injectable()
export class PaymentSettingsService {
  constructor(
    @InjectModel(PaymentSetting.name)
    private paymentModel: Model<PaymentSettingDocument>,
  ) { }

  async saveSettings(companyId: string, dto: CreatePaymentSettingDto) {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }

    const existing = await this.paymentModel.findOne({
      companyId: new Types.ObjectId(companyId),
      mode: dto.mode,
    });

    if (existing) {
      existing.nickName = dto.nickName;
      existing.clientId = dto.clientId;
      existing.secretKey = dto.secretKey;
      await existing.save();

      return {
        success: true,
        message: `PayPal ${dto.mode} settings updated successfully`,
        data: existing,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { companyId: _, ...settingsData } = dto as any;

    const created = await this.paymentModel.create({
      ...settingsData,
      companyId: new Types.ObjectId(companyId),
    });

    return {
      success: true,
      message: `PayPal ${dto.mode} settings saved successfully`,
      data: created,
    };
  }

  async getSettings(companyId: string, mode: 'live' | 'sandbox') {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing. Please relogin.');
    }

    const data = await this.paymentModel.findOne({
      companyId: new Types.ObjectId(companyId),
      mode,
    });

    if (!data) {
      throw new BadRequestException(
        `No PayPal settings found for ${mode} mode`,
      );
    }

    return {
      success: true,
      data,
    };
  }
}
