import { Test, TestingModule } from '@nestjs/testing';
import { MailDocumentService } from './mail-document.service';

describe('MailDocumentService', () => {
  let service: MailDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailDocumentService],
    }).compile();

    service = module.get<MailDocumentService>(MailDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
