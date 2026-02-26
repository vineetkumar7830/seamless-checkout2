import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CashExpenseController } from './cash-expense.controller';
import { CashExpenseService } from './cash-expense.service';

import { CashAccount, CashAccountSchema } from './entities/cash-account.schema';
import { CashExpense, CashExpenseSchema } from './entities/cash-expense.entity';
import { Payee, PayeeSchema } from 'src/payee/entities/payee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: CashExpense.name, schema: CashExpenseSchema },
      { name: Payee.name, schema: PayeeSchema },
    ]),
  ],
  controllers: [CashExpenseController],
  providers: [CashExpenseService],
  exports: [CashExpenseService],
})
export class CashExpenseModule {}
