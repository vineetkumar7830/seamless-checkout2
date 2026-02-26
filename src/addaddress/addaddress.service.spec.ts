import { Test, TestingModule } from '@nestjs/testing';
import { AddaddressService } from './addaddress.service';

describe('AddaddressService', () => {
  let service: AddaddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddaddressService],
    }).compile();

    service = module.get<AddaddressService>(AddaddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
