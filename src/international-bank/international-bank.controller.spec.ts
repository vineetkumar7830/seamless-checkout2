import { Test, TestingModule } from '@nestjs/testing';
import { InternationalBankController } from './international-bank.controller';
import { InternationalBankService } from './international-bank.service';

describe('InternationalBankController', () => {
  let controller: InternationalBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternationalBankController],
      providers: [InternationalBankService],
    }).compile();

    controller = module.get<InternationalBankController>(InternationalBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
