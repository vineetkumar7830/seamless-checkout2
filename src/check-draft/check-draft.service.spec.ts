import { Test, TestingModule } from '@nestjs/testing';
import { CheckDraftService } from './check-draft.service';

describe('CheckDraftService', () => {
  let service: CheckDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckDraftService],
    }).compile();

    service = module.get<CheckDraftService>(CheckDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
