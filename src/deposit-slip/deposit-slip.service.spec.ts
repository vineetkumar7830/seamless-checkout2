import { Test, TestingModule } from '@nestjs/testing';
import { DepositSlipService } from './deposit-slip.service';

describe('DepositSlipService', () => {
  let service: DepositSlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositSlipService],
    }).compile();

    service = module.get<DepositSlipService>(DepositSlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
