import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternationalBank, InternationalBankSchema } from './entities/international-bank.entity';
import { InternationalBankController } from './international-bank.controller';
import { InternationalBankService } from './international-bank.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternationalBank.name, schema: InternationalBankSchema },
    ]),
  ],
  controllers: [InternationalBankController],
  providers: [InternationalBankService],
})
export class InternationalBankModule {}
