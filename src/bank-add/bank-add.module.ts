import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { BankAddController } from './bank-add.controller';
import { BankAddService } from './bank-add.service';
import { BankAdd, BankAddSchema } from './entities/bank-add.entity';

@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([
      { name: BankAdd.name, schema: BankAddSchema },
    ]),
  ],
  controllers: [BankAddController],
  providers: [BankAddService],
})
export class BankAddModule {}
