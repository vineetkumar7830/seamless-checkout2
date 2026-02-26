import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailDocumentController } from './mail-document.controller';
import { MailDocumentService } from './mail-document.service';

import {
  MailDocument,
  MailDocumentSchema,
} from './entities/mail-document.entity';

import { Payee, PayeeSchema } from '../payee/entities/payee.entity';

import {
  Addaddress,
  AddaddressSchema,
} from '../addaddress/entities/addaddress.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailDocument.name, schema: MailDocumentSchema },
      { name: Payee.name, schema: PayeeSchema },
      { name: Addaddress.name, schema: AddaddressSchema }, 
    ]),
  ],
  controllers: [MailDocumentController],
  providers: [MailDocumentService],
})
export class MailDocumentModule {}
