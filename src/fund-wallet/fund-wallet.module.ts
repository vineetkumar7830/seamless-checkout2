// src/fund-wallet/fund-wallet.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FundWalletController } from './fund-wallet.controller';
import { FundWalletService } from './fund-wallet.service';
import {
  FundTransaction,
  FundTransactionSchema,
} from './entities/fund-wallet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FundTransaction.name, schema: FundTransactionSchema },
    ]),
  ],
  controllers: [FundWalletController],
  providers: [FundWalletService],
})
export class FundWalletModule {}
