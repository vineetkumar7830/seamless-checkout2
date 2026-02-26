import { Test, TestingModule } from '@nestjs/testing';
import { PayeeDetailsService } from './payee-details.service';

describe('PayeeDetailsService', () => {
  let service: PayeeDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayeeDetailsService],
    }).compile();

    service = module.get<PayeeDetailsService>(PayeeDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
