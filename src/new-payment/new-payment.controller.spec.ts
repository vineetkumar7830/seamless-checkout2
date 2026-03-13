import { Test, TestingModule } from '@nestjs/testing';
import { NewPaymentController } from './new-payment.controller';
import { NewPaymentService } from './new-payment.service';

describe('NewPaymentController', () => {
  let controller: NewPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewPaymentController],
      providers: [NewPaymentService],
    }).compile();

    controller = module.get<NewPaymentController>(NewPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
