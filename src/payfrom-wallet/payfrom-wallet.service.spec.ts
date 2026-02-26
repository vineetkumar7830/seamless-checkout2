import { Test, TestingModule } from '@nestjs/testing';
import { PayFromWalletService } from './payfrom-wallet.service';

describe('PayfromWalletService', () => {
  let service: PayFromWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayFromWalletService],
    }).compile();

    service = module.get<PayFromWalletService>(PayFromWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
