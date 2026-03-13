import { Test, TestingModule } from '@nestjs/testing';
import { AddNewBankController } from './add-new-bank.controller';
import { AddNewBankService } from './add-new-bank.service';

describe('AddNewBankController', () => {
  let controller: AddNewBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddNewBankController],
      providers: [AddNewBankService],
    }).compile();

    controller = module.get<AddNewBankController>(AddNewBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
