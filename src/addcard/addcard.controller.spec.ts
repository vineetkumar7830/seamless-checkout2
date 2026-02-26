import { Test, TestingModule } from '@nestjs/testing';
import { AddCardController } from './addcard.controller';
import { AddCardService } from './addcard.service';

describe('AddcardController', () => {
  let controller: AddCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCardController],
      providers: [AddCardService],
    }).compile();

    controller = module.get<AddCardController>(AddCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
