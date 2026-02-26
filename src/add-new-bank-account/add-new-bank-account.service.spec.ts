import { Test, TestingModule } from '@nestjs/testing';
import { AddNewBankAccountService } from './add-new-bank-account.service';

describe('AddNewBankAccountService', () => {
  let service: AddNewBankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddNewBankAccountService],
    }).compile();

    service = module.get<AddNewBankAccountService>(AddNewBankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
