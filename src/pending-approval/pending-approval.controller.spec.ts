import { Test, TestingModule } from '@nestjs/testing';
import { PendingApprovalController } from './pending-approval.controller';
import { PendingApprovalService } from './pending-approval.service';

describe('PendingApprovalController', () => {
  let controller: PendingApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingApprovalController],
      providers: [PendingApprovalService],
    }).compile();

    controller = module.get<PendingApprovalController>(PendingApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
