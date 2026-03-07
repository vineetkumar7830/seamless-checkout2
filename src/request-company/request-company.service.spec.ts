import { Test, TestingModule } from '@nestjs/testing';
import { RequestCompanyService } from './request-company.service';

describe('RequestCompanyService', () => {
  let service: RequestCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestCompanyService],
    }).compile();

    service = module.get<RequestCompanyService>(RequestCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
