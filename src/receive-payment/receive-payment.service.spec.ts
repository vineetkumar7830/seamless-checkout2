import { Test, TestingModule } from '@nestjs/testing';
import { ReceivePaymentService } from './receive-payment.service';

describe('ReceivePaymentService', () => {
  let service: ReceivePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivePaymentService],
    }).compile();

    service = module.get<ReceivePaymentService>(ReceivePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
