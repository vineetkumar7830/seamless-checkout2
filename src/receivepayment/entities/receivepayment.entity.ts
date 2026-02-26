// src/receivepayment/schemas/receivepayment.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReceivePaymentDocument = ReceivePayment & Document;

export enum ReceiveFromType {
  PAYEE = 'payee',
  EMAIL = 'email',
  SMS = 'sms',
}

@Schema({ timestamps: true })
export class ReceivePayment {
  // SaaS keys
  @Prop({ type: Types.ObjectId, required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId;

  // Mode
  @Prop({ enum: ReceiveFromType, required: true })
  receiveFrom: ReceiveFromType;

  // Conditional fields
  @Prop({ type: Types.ObjectId, ref: 'Payee', default: null })
  payeeId?: Types.ObjectId;

  @Prop({ default: null })
  email?: string;

  @Prop({ default: null })
  mobile?: string;

  // Wallet
  @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
  walletId: Types.ObjectId;

  // Payment Info
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  memo: string;

  @Prop({ default: false })
  editable: boolean;

  @Prop({ default: false })
  recurring: boolean;

  @Prop({ default: 'pending' })
  status: string;
}

export const ReceivePaymentSchema =
  SchemaFactory.createForClass(ReceivePayment);