import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RemittanceDocument = Remittance & Document;

@Schema({ timestamps: true })
export class Remittance {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CheckDraft', required: true, index: true })
  checkDraftId: Types.ObjectId;

  @Prop({ type: String })
  invoiceNo: string;

  @Prop({ type: String })
  item: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  unitCost: number;

  @Prop({ type: Number })
  total: number;
}

export const RemittanceSchema =
  SchemaFactory.createForClass(Remittance);
