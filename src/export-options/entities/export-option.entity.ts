import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ExportOption extends Document {

  @Prop({ required: true })
  payeeName: string;

  @Prop()
  payeeEmail?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: string;

  @Prop()
  memo?: string;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  previewUrl?: string;

  @Prop()
  pdfUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const ExportOptionSchema =
  SchemaFactory.createForClass(ExportOption);
