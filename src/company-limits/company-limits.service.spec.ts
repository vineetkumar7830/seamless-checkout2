import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLimitsService } from './company-limits.service';

describe('CompanyLimitsService', () => {
  let service: CompanyLimitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyLimitsService],
    }).compile();

    service = module.get<CompanyLimitsService>(CompanyLimitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
