import { Test, TestingModule } from '@nestjs/testing';
import { AddcompanyService } from './addcompany.service';

describe('AddcompanyService', () => {
  let service: AddcompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddcompanyService],
    }).compile();

    service = module.get<AddcompanyService>(AddcompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
