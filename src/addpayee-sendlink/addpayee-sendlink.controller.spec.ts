import { Test, TestingModule } from '@nestjs/testing';
import { AddPayeeSendLinkController } from './addpayee-sendlink.controller';
import { AddPayeeSendLinkService } from './addpayee-sendlink.service';

describe('AddpayeeSendlinkController', () => {
  let controller: AddPayeeSendLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddPayeeSendLinkController],
      providers: [AddPayeeSendLinkService],
    }).compile();

    controller = module.get<AddPayeeSendLinkController>(AddPayeeSendLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
