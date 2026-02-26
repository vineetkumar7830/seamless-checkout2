import { Test, TestingModule } from '@nestjs/testing';
import { FundWalletService } from './fund-wallet.service';

describe('FundWalletService', () => {
  let service: FundWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundWalletService],
    }).compile();

    service = module.get<FundWalletService>(FundWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
