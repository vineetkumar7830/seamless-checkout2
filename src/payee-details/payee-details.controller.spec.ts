import { Test, TestingModule } from '@nestjs/testing';
import { PayeeDetailsController } from './payee-details.controller';
import { PayeeDetailsService } from './payee-details.service';

describe('PayeeDetailsController', () => {
  let controller: PayeeDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayeeDetailsController],
      providers: [PayeeDetailsService],
    }).compile();

    controller = module.get<PayeeDetailsController>(PayeeDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
