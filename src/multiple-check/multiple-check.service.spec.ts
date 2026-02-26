import { Test, TestingModule } from '@nestjs/testing';
import { MultipleCheckService } from './multiple-check.service';

describe('MultipleCheckService', () => {
  let service: MultipleCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultipleCheckService],
    }).compile();

    service = module.get<MultipleCheckService>(MultipleCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
