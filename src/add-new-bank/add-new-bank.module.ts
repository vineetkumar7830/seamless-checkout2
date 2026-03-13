import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddNewBankController } from './add-new-bank.controller';
import { AddNewBankService } from './add-new-bank.service';
import { AddNewBank, AddNewBankSchema } from './entities/add-new-bank.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddNewBank.name, schema: AddNewBankSchema }
    ])
  ],
  controllers: [AddNewBankController],
  providers: [AddNewBankService],
})
export class AddNewBankModule {}