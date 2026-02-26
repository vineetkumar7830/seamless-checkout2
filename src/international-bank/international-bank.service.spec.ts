import { Test, TestingModule } from '@nestjs/testing';
import { InternationalBankService } from './international-bank.service';

describe('InternationalBankService', () => {
  let service: InternationalBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternationalBankService],
    }).compile();

    service = module.get<InternationalBankService>(InternationalBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
