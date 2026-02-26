import { Test, TestingModule } from '@nestjs/testing';
import { FundWalletController } from './fund-wallet.controller';
import { FundWalletService } from './fund-wallet.service';

describe('FundWalletController', () => {
  let controller: FundWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundWalletController],
      providers: [FundWalletService],
    }).compile();

    controller = module.get<FundWalletController>(FundWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
