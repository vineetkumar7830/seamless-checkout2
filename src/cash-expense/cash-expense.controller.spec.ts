import { Test, TestingModule } from '@nestjs/testing';
import { CashExpenseController } from './cash-expense.controller';
import { CashExpenseService } from './cash-expense.service';

describe('CashExpenseController', () => {
  let controller: CashExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashExpenseController],
      providers: [CashExpenseService],
    }).compile();

    controller = module.get<CashExpenseController>(CashExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
