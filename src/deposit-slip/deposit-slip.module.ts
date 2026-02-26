import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DepositSlip,
  DepositSlipSchema,
} from './entities/deposit-slip.entity';
import { DepositSlipController } from './deposit-slip.controller';
import { DepositSlipService } from './deposit-slip.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DepositSlip.name, schema: DepositSlipSchema },
    ]),
  ],
  controllers: [DepositSlipController],
  providers: [DepositSlipService],
})
export class DepositSlipModule {}
