import { Test, TestingModule } from '@nestjs/testing';
import { NewPaymentService } from './new-payment.service';

describe('NewPaymentService', () => {
  let service: NewPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewPaymentService],
    }).compile();

    service = module.get<NewPaymentService>(NewPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
