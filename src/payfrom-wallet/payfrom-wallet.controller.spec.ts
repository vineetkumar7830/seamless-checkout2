import { Test, TestingModule } from '@nestjs/testing';
import { PayFromWalletController } from './payfrom-wallet.controller';
import { PayFromWalletService } from './payfrom-wallet.service';

describe('PayfromWalletController', () => {
  let controller: PayFromWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayFromWalletController],
      providers: [PayFromWalletService],
    }).compile();

    controller = module.get<PayFromWalletController>(PayFromWalletService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
