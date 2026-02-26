import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AddNewBankAccount,
  AddNewBankAccountSchema,
} from './entities/add-new-bank-account.entity';
import { AddNewBankAccountService } from './add-new-bank-account.service';
import { AddNewBankAccountController } from './add-new-bank-account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddNewBankAccount.name, schema: AddNewBankAccountSchema },
    ]),
  ],
  controllers: [AddNewBankAccountController],
  providers: [AddNewBankAccountService],
})
export class AddNewBankAccountModule {}