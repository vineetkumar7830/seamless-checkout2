import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BillExtract extends Document {

  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;  

  @Prop({ type: Types.ObjectId, ref: 'Bill', required: true })
  billId: Types.ObjectId;

  @Prop({ required: true })
  fileUrl: string;

  @Prop()
  extractedInvoiceNo: string;

  @Prop()
  extractedAmount: number;

  @Prop()
  extractedInvoiceDate: string;

  @Prop({ default: false })
  isExtracted: boolean;
}

export const BillExtractSchema =
  SchemaFactory.createForClass(BillExtract);