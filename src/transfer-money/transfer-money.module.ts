import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferMoneyController } from './transfer-money.controller';
import { TransferMoneyService } from './transfer-money.service';
import { Transfer, TransferSchema } from './entities/transfer-money.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
    ]),
  ],
  controllers: [TransferMoneyController],
  providers: [TransferMoneyService],
})
export class TransferMoneyModule {}
