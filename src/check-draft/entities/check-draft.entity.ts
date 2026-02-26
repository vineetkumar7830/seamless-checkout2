import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckDraftDocument = CheckDraft & Document;

@Schema({ timestamps: true })
export class CheckDraft {

  // 🔥 SaaS / Tenant Key
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  // 🔹 Check From / Client
  @Prop({ type: String, required: true })
  checkFrom: string;

  // 🔹 Bank Account
  @Prop({ type: String, required: true })
  bankAccountId: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  checkDate: Date;

  @Prop({ type: String })
  payeeName: string;

  @Prop({ type: String })
  checkDraftNo: string;

  @Prop({ type: String })
  accountNoIfAny: string;

  @Prop({ type: String })
  invoiceNoIfAny: string;

  @Prop({ type: String })
  commentNote: string;

  @Prop({ type: String })
  memo: string;

  @Prop({ type: Boolean, default: false })
  askPermission: boolean;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: Number, default: 0 })
  totalFee: number;

  @Prop({ type: Boolean, default: false })
  isSent: boolean;

  @Prop({ type: Boolean, default: false })
  isPrinted: boolean;

  @Prop({ type: Boolean, default: false })
  isRecurring: boolean;
}

export const CheckDraftSchema =
  SchemaFactory.createForClass(CheckDraft);
