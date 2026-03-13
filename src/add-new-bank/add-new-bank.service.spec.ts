import { Test, TestingModule } from '@nestjs/testing';
import { AddNewBankService } from './add-new-bank.service';

describe('AddNewBankService', () => {
  let service: AddNewBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddNewBankService],
    }).compile();

    service = module.get<AddNewBankService>(AddNewBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
