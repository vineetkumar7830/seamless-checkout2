import { Test, TestingModule } from '@nestjs/testing';
import { CheckDraftController } from './check-draft.controller';
import { CheckDraftService } from './check-draft.service';

describe('CheckDraftController', () => {
  let controller: CheckDraftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckDraftController],
      providers: [CheckDraftService],
    }).compile();

    controller = module.get<CheckDraftController>(CheckDraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
