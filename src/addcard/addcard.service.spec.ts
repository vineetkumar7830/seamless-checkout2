import { Test, TestingModule } from '@nestjs/testing';
import { AddCardService } from './addcard.service';

describe('AddcardService', () => {
  let service: AddCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCardService],
    }).compile();

    service = module.get<AddCardService>(AddCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
