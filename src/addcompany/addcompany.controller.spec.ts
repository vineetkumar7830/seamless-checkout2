import { Test, TestingModule } from '@nestjs/testing';
import { AddCompanyController } from './addcompany.controller';
import { AddCompanyService } from './addcompany.service';

describe('AddcompanyController', () => {
  let controller: AddCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCompanyController],
      providers: [AddCompanyService],
    }).compile();

    controller = module.get<AddCompanyController>(AddCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
