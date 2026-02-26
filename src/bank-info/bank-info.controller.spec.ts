import { Test, TestingModule } from '@nestjs/testing';
import { BankInfoController } from './bank-info.controller';
import { BankInfoService } from './bank-info.service';

describe('BankInfoController', () => {
  let controller: BankInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankInfoController],
      providers: [BankInfoService],
    }).compile();

    controller = module.get<BankInfoController>(BankInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
