import { Test, TestingModule } from '@nestjs/testing';
import { BulkPayController } from './bulk-pay.controller';
import { BulkPayService } from './bulk-pay.service';

describe('BulkPayController', () => {
  let controller: BulkPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkPayController],
      providers: [BulkPayService],
    }).compile();

    controller = module.get<BulkPayController>(BulkPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
