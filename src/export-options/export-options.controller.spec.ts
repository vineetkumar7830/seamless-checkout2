    import { Test, TestingModule } from '@nestjs/testing';
import { ExportController } from './export-options.controller';
import { ExportService } from './export-options.service';

describe('ExportOptionsController', () => {
  let controller: ExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportController],
      providers: [ExportService],
    }).compile();

    controller = module.get<ExportController>(ExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
