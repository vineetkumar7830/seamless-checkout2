import { Test, TestingModule } from '@nestjs/testing';
import { BulkPayService } from './bulk-pay.service';

describe('BulkPayService', () => {
  let service: BulkPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkPayService],
    }).compile();

    service = module.get<BulkPayService>(BulkPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
