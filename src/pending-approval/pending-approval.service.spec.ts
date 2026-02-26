import { Test, TestingModule } from '@nestjs/testing';
import { PendingApprovalService } from './pending-approval.service';

describe('PendingApprovalService', () => {
  let service: PendingApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingApprovalService],
    }).compile();

    service = module.get<PendingApprovalService>(PendingApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
