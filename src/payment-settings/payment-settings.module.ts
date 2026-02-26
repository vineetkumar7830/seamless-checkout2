import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSettingsController } from './payment-settings.controller';
import { PaymentSettingsService } from './payment-settings.service';
import {
  PaymentSetting,
  PaymentSettingSchema,
} from './entities/payment-setting.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentSetting.name, schema: PaymentSettingSchema },
    ]),
  ],
  controllers: [PaymentSettingsController],
  providers: [PaymentSettingsService],
})
export class PaymentSettingsModule {}
