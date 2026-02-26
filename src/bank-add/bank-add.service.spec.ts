import { Test, TestingModule } from '@nestjs/testing';
import { BankAddService } from './bank-add.service';

describe('BankAddService', () => {
  let service: BankAddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAddService],
    }).compile();

    service = module.get<BankAddService>(BankAddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
