import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionBillingController } from './subscription-billing.controller';
import { SubscriptionBillingService } from './subscription-billing.service';

describe('SubscriptionBillingController', () => {
  let controller: SubscriptionBillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionBillingController],
      providers: [SubscriptionBillingService],
    }).compile();

    controller = module.get<SubscriptionBillingController>(SubscriptionBillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
