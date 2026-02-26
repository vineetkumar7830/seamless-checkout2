import { Test, TestingModule } from '@nestjs/testing';
import { ReceivePaymentController } from './receive-payment.controller';
import { ReceivePaymentService } from './receive-payment.service';

describe('ReceivePaymentController', () => {
  let controller: ReceivePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivePaymentController],
      providers: [ReceivePaymentService],
    }).compile();

    controller = module.get<ReceivePaymentController>(ReceivePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
