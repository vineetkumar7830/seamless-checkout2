import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

import { Bill, BillSchema } from './entities/bill.entity';
import { BillAttachment, BillAttachmentSchema } from './entities/bill-attachment.entity';
import { BillComment, BillCommentSchema } from './entities/bill-comment.entity';
import { BillExtract, BillExtractSchema } from './entities/bill-extract.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bill.name, schema: BillSchema },
      { name: BillAttachment.name, schema: BillAttachmentSchema },
      { name: BillComment.name, schema: BillCommentSchema },
      { name: BillExtract.name, schema: BillExtractSchema }, 
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
