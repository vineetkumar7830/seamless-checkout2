import { Test, TestingModule } from '@nestjs/testing';
import { AddCreditCardService } from './add-credit-card.service';

describe('AddCreditCardService', () => {
  let service: AddCreditCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCreditCardService],
    }).compile();

    service = module.get<AddCreditCardService>(AddCreditCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
