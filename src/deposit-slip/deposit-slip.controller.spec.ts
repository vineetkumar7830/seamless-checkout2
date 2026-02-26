import { Test, TestingModule } from '@nestjs/testing';
import { DepositSlipController } from './deposit-slip.controller';
import { DepositSlipService } from './deposit-slip.service';

describe('DepositSlipController', () => {
  let controller: DepositSlipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositSlipController],
      providers: [DepositSlipService],
    }).compile();

    controller = module.get<DepositSlipController>(DepositSlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
