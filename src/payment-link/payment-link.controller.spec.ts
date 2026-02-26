import { Test, TestingModule } from '@nestjs/testing';
import { PaymentLinkController } from './payment-link.controller';
import { PaymentLinkService } from './payment-link.service';

describe('PaymentLinkController', () => {
  let controller: PaymentLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentLinkController],
      providers: [PaymentLinkService],
    }).compile();

    controller = module.get<PaymentLinkController>(PaymentLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
