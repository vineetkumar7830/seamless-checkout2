import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BulkPay, BulkPaySchema } from './entities/bulk-pay.entity';
import { BulkPayController } from './bulk-pay.controller';
import { BulkPayService } from './bulk-pay.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BulkPay.name, schema: BulkPaySchema },
    ]),
  ],
  controllers: [BulkPayController],
  providers: [BulkPayService],
})
export class BulkPayModule {}