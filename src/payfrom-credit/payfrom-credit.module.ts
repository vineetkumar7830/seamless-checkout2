import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayFromCreditController } from './payfrom-credit.controller';
import { PayFromCreditService } from './payfrom-credit.service';
import {
  CreditPay,
  CreditPaySchema,
} from './entities/payfrom-credit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreditPay.name, schema: CreditPaySchema },
    ]),
  ],
  controllers: [PayFromCreditController],
  providers: [PayFromCreditService],
})
export class PayFromCreditModule {}
