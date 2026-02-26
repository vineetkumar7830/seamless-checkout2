import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLimitsController } from './company-limits.controller';
import { CompanyLimitsService } from './company-limits.service';

describe('CompanyLimitsController', () => {
  let controller: CompanyLimitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyLimitsController],
      providers: [CompanyLimitsService],
    }).compile();

    controller = module.get<CompanyLimitsController>(CompanyLimitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
