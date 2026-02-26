import { Test, TestingModule } from '@nestjs/testing';
import { ReceivePaymentController } from './receivepayment.controller';
import { ReceivePaymentService } from './receivepayment.service';

describe('ReceivepaymentController', () => {
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
