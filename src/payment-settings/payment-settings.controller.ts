import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PaymentSettingsService } from './payment-settings.service';
import { CreatePaymentSettingDto } from './dto/create-payment-setting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/payment-settings')
@UseGuards(JwtAuthGuard)
export class PaymentSettingsController {
  constructor(private readonly service: PaymentSettingsService) { }

  @Post()
  async save(@GetUser('companyId') companyId: string, @Body() dto: CreatePaymentSettingDto) {
    return this.service.saveSettings(companyId, dto);
  }

  @Get(':mode')
  async get(@GetUser('companyId') companyId: string, @Param('mode') mode: 'live' | 'sandbox') {
    return this.service.getSettings(companyId, mode);
  }
}
