import { Test, TestingModule } from '@nestjs/testing';
import { AddaddressController } from './addaddress.controller';
import { AddaddressService } from './addaddress.service';

describe('AddaddressController', () => {
  let controller: AddaddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddaddressController],
      providers: [AddaddressService],
    }).compile();

    controller = module.get<AddaddressController>(AddaddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
