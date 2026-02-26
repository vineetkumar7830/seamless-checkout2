import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { AuthModule } from '../auth/auth.module';

import { Invoice, InvoiceSchema } from './entities/invoice.entity';
import {
  InvoiceAttachment,
  InvoiceAttachmentSchema,
} from './entities/invoice-attachment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
      {
        name: InvoiceAttachment.name,
        schema: InvoiceAttachmentSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule { }
