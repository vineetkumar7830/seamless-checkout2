import { Test, TestingModule } from '@nestjs/testing';
import { PayFromCreditService} from './payfrom-credit.service';

describe('PayfromCreditService', () => {
  let service: PayFromCreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayFromCreditService],
    }).compile();

    service = module.get<PayFromCreditService>(PayFromCreditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
