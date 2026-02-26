import { Test, TestingModule } from '@nestjs/testing';
import { MultipleCheckController } from './multiple-check.controller';
import { MultipleCheckService } from './multiple-check.service';

describe('MultipleCheckController', () => {
  let controller: MultipleCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultipleCheckController],
      providers: [MultipleCheckService],
    }).compile();

    controller = module.get<MultipleCheckController>(MultipleCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
