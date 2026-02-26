import { Test, TestingModule } from '@nestjs/testing';
import { AddItemService } from './add-item.service';

describe('AddItemService', () => {
  let service: AddItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddItemService],
    }).compile();

    service = module.get<AddItemService>(AddItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
