import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReceivedService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentReceivedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentReceivedService],
    }).compile();

    service = module.get<PaymentReceivedService>(PaymentReceivedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
