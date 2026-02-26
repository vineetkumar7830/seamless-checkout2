import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FinancialReport extends Document {
  @Prop({ required: true })
  payeeName: string;

  @Prop()
  payeeEmail?: string;

  @Prop()
  payeePhone?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  transactionDate: string;

  @Prop()
  memo?: string;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  pdfUrl?: string;

  @Prop()
  previewUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const FinancialReportSchema =
  SchemaFactory.createForClass(FinancialReport);