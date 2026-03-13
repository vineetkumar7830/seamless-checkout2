import { Test, TestingModule } from '@nestjs/testing';
import { BlankChecksService } from './blank-checks.service';

describe('BlankChecksService', () => {
  let service: BlankChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlankChecksService],
    }).compile();

    service = module.get<BlankChecksService>(BlankChecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
