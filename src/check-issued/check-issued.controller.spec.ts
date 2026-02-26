import { Test, TestingModule } from '@nestjs/testing';
import { CheckIssuedController } from './check-issued.controller';
import { CheckIssuedService } from './check-issued.service';

describe('CheckIssuedController', () => {
  let controller: CheckIssuedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckIssuedController],
      providers: [CheckIssuedService],
    }).compile();

    controller = module.get<CheckIssuedController>(CheckIssuedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
