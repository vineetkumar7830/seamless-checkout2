import { Test, TestingModule } from '@nestjs/testing';
import { RequestCompanyController } from './request-company.controller';
import { RequestCompanyService } from './request-company.service';

describe('RequestCompanyController', () => {
  let controller: RequestCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestCompanyController],
      providers: [RequestCompanyService],
    }).compile();

    controller = module.get<RequestCompanyController>(RequestCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
