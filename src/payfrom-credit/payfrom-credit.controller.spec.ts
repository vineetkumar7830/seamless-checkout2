import { Test, TestingModule } from '@nestjs/testing';
import { PayFromCreditController } from './payfrom-credit.controller';
import { PayFromCreditService } from './payfrom-credit.service';

describe('PayfromCreditController', () => {
  let controller: PayFromCreditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayFromCreditController],
      providers: [PayFromCreditService],
    }).compile();

    controller = module.get<PayFromCreditController>(PayFromCreditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
