import { Test, TestingModule } from '@nestjs/testing';
import { CashExpenseService } from './cash-expense.service';

describe('CashExpenseService', () => {
  let service: CashExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashExpenseService],
    }).compile();

    service = module.get<CashExpenseService>(CashExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
