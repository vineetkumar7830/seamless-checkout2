import { Test, TestingModule } from '@nestjs/testing';
import { BlankChecksController } from './blank-checks.controller';
import { BlankChecksService } from './blank-checks.service';

describe('BlankChecksController', () => {
  let controller: BlankChecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlankChecksController],
      providers: [BlankChecksService],
    }).compile();

    controller = module.get<BlankChecksController>(BlankChecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
