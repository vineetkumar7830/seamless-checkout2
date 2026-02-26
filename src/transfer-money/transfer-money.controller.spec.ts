import { Test, TestingModule } from '@nestjs/testing';
import { TransferMoneyController } from './transfer-money.controller';
import { TransferMoneyService } from './transfer-money.service';

describe('TransferMoneyController', () => {
  let controller: TransferMoneyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferMoneyController],
      providers: [TransferMoneyService],
    }).compile();

    controller = module.get<TransferMoneyController>(TransferMoneyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
