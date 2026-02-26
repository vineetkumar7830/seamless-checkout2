import { Test, TestingModule } from '@nestjs/testing';
import { CompanySwitcherController } from './company-switcher.controller';
import { CompanySwitcherService } from './company-switcher.service';

describe('CompanySwitcherController', () => {
  let controller: CompanySwitcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySwitcherController],
      providers: [CompanySwitcherService],
    }).compile();

    controller = module.get<CompanySwitcherController>(CompanySwitcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
