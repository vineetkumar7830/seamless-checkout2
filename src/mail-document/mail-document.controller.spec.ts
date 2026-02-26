import { Test, TestingModule } from '@nestjs/testing';
import { MailDocumentController } from './mail-document.controller';
import { MailDocumentService } from './mail-document.service';

describe('MailDocumentController', () => {
  let controller: MailDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailDocumentController],
      providers: [MailDocumentService],
    }).compile();

    controller = module.get<MailDocumentController>(MailDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
