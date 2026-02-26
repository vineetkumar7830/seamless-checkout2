import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankInfoController } from './bank-info.controller';
import { BankInfoService } from './bank-info.service';
import { BankInfo, BankInfoSchema } from './entities/bank-info.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankInfo.name, schema: BankInfoSchema },
    ]),
  ],
  controllers: [BankInfoController],
  providers: [BankInfoService],
})
export class BankInfoModule {}
