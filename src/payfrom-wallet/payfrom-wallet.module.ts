import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayFromWalletController } from './payfrom-wallet.controller';
import { PayFromWalletService } from './payfrom-wallet.service';
import {
  WalletPay,
  WalletPaySchema,
} from './entities/payfrom-wallet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletPay.name, schema: WalletPaySchema },
    ]),
  ],
  controllers: [PayFromWalletController],
  providers: [PayFromWalletService],
})
export class PayFromWalletModule {}
