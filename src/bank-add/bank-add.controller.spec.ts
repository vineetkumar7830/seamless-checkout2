import { Test, TestingModule } from '@nestjs/testing';
import { BankAddController } from './bank-add.controller';
import { BankAddService } from './bank-add.service';

describe('BankAddController', () => {
  let controller: BankAddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAddController],
      providers: [BankAddService],
    }).compile();

    controller = module.get<BankAddController>(BankAddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
