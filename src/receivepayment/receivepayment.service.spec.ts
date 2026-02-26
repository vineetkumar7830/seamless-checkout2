import { Test, TestingModule } from '@nestjs/testing';
import { ReceivepaymentService } from './receivepayment.service';

describe('ReceivepaymentService', () => {
  let service: ReceivepaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivepaymentService],
    }).compile();

    service = module.get<ReceivepaymentService>(ReceivepaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
