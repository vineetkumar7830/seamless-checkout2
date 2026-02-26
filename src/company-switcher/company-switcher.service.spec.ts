import { Test, TestingModule } from '@nestjs/testing';
import { CompanySwitcherService } from './company-switcher.service';

describe('CompanySwitcherService', () => {
  let service: CompanySwitcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySwitcherService],
    }).compile();

    service = module.get<CompanySwitcherService>(CompanySwitcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
