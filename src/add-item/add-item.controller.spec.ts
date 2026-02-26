import { Test, TestingModule } from '@nestjs/testing';
import { AddItemController } from './add-item.controller';
import { AddItemService } from './add-item.service';

describe('AddItemController', () => {
  let controller: AddItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddItemController],
      providers: [AddItemService],
    }).compile();

    controller = module.get<AddItemController>(AddItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
