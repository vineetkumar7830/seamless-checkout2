import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BulkPayDocument = BulkPay & Document;

export enum PayFromType {
  WALLET = 'Wallet',
  BANK_ACCOUNT = 'Bank Account',
  CREDIT_CARD = 'Credit Card',
}

export enum PayAsType {
  ACH = 'ACH / DD',
  WIRE = 'Wire',
  VIRTUAL_CARD = 'Virtual Card',
  CHECK = 'Check',
}

@Schema({ _id: false })
export class PaymentRow {
  @Prop({ enum: PayFromType, required: true })
  payFrom: PayFromType;

  @Prop({ enum: PayAsType, required: true })
  payAs: PayAsType;

  @Prop({ type: Types.ObjectId, required: true })
  sourceId: Types.ObjectId;

  @Prop({ required: true })
  sourceType: string; // auto set internally

  @Prop({ type: Types.ObjectId, ref: 'Payee', required: true })
  payTo: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category?: Types.ObjectId;

  @Prop()
  invoiceNumber?: string;

  @Prop()
  memo?: string;
}

export const PaymentRowSchema =
  SchemaFactory.createForClass(PaymentRow);

@Schema({ timestamps: true })
export class BulkPay {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: PayFromType, required: true })
  payFrom: PayFromType;

  @Prop({ enum: PayAsType, required: true })
  payAs: PayAsType;

  @Prop({ type: Types.ObjectId, required: true })
  sourceId: Types.ObjectId;

  @Prop({ required: true })
  sourceType: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category?: Types.ObjectId;

  @Prop()
  memo?: string;

  @Prop({ type: [PaymentRowSchema], default: [] })
  payments: PaymentRow[];

  @Prop({ default: 0 })
  totalValidPayments: number;

  @Prop({ default: 0 })
  totalAmount: number;
}

export const BulkPaySchema =
  SchemaFactory.createForClass(BulkPay);