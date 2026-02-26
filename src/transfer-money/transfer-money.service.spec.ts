import { Test, TestingModule } from '@nestjs/testing';
import { TransferMoneyService } from './transfer-money.service';

describe('TransferMoneyService', () => {
  let service: TransferMoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferMoneyService],
    }).compile();

    service = module.get<TransferMoneyService>(TransferMoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
