import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionBillingService } from './subscription-billing.service';

describe('SubscriptionBillingService', () => {
  let service: SubscriptionBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionBillingService],
    }).compile();

    service = module.get<SubscriptionBillingService>(SubscriptionBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
