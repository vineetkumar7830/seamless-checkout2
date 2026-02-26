import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayeeDetails, PayeeDetailsSchema } from './entities/payee-detail.entity';
import { PayeeDetailsService } from './payee-details.service';
import { PayeeDetailsController } from './payee-details.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayeeDetails.name, schema: PayeeDetailsSchema },
    ]),
  ],
  controllers: [PayeeDetailsController],
  providers: [PayeeDetailsService],
})
export class PayeeDetailsModule {}
