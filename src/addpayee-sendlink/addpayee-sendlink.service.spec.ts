import { Test, TestingModule } from '@nestjs/testing';
import { AddPayeeSendLinkService} from './addpayee-sendlink.service';

describe('AddpayeeSendlinkService', () => {
  let service: AddPayeeSendLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddPayeeSendLinkService],
    }).compile();

    service = module.get<AddPayeeSendLinkService>(AddPayeeSendLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
