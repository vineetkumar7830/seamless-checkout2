import { Test, TestingModule } from '@nestjs/testing';
import { CheckIssuedService } from './check-issued.service';

describe('CheckIssuedService', () => {
  let service: CheckIssuedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckIssuedService],
    }).compile();

    service = module.get<CheckIssuedService>(CheckIssuedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
