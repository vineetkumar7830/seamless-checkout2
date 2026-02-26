import { Test, TestingModule } from '@nestjs/testing';
import { AddNewBankAccountController } from './add-new-bank-account.controller';
import { AddNewBankAccountService } from './add-new-bank-account.service';

describe('AddNewBankAccountController', () => {
  let controller: AddNewBankAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddNewBankAccountController],
      providers: [AddNewBankAccountService],
    }).compile();

    controller = module.get<AddNewBankAccountController>(AddNewBankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
