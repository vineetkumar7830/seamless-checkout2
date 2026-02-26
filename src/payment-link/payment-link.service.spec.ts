import { Test, TestingModule } from '@nestjs/testing';
import { PaymentLinkService } from './payment-link.service';

describe('PaymentLinkService', () => {
  let service: PaymentLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentLinkService],
    }).compile();

    service = module.get<PaymentLinkService>(PaymentLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
