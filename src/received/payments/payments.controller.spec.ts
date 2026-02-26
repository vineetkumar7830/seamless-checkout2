import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReceivedController } from './payments.controller';
import { PaymentReceivedService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentReceivedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentReceivedController],
      providers: [PaymentReceivedService],
    }).compile();

    controller = module.get<PaymentReceivedController>(PaymentReceivedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
