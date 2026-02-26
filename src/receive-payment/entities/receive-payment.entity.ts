import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReceivePaymentDocument = ReceivePayment & Document;

@Schema({ timestamps: true })
export class ReceivePayment {

  @Prop({ required: true, enum: ['payee', 'email', 'sms'] })
  receiveFrom: string;

  @Prop({ type: String })
  payeeId: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  mobileNo: string;

  @Prop({ required: true, type: String })
  walletId: string;

  @Prop({ required: true, type: String })
  amount: string;

  @Prop({ required: true, type: String })
  invoiceNumber: string;

  @Prop({ required: true, type: String })
  memo: string;

  @Prop({ type: String, default: 'true' })
  editable: string;

  @Prop({ type: String, default: 'false' })
  recurring: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const ReceivePaymentSchema =
  SchemaFactory.createForClass(ReceivePayment);
