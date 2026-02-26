import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WalletPay extends Document {

  // 🔹 SaaS Company
  @Prop({ required: true })
  companyId: string;

  // 🔹 PAY / RECEIVE
  @Prop({ enum: ['pay', 'receive'], default: 'pay' })
  mode: string;

  // 🔹 PAY FROM / PAY AS
  @Prop({ default: 'wallet' })
  payFrom: string;

  @Prop({ enum: ['same-day-ach'], required: true })
  payAs: string;

  @Prop({ required: true })
  amount: number;

  // 🔹 WALLET + PAYEE
  @Prop({ required: true })
  walletId: string;

  @Prop({ required: true })
  payeeId: string;

  @Prop({ required: true })
  payeeEmail: string;

  @Prop()
  invoiceNumber: string;

  @Prop()
  payeeAccountNumber: string;

  @Prop()
  payeeBankAccount: string;

  @Prop()
  category: string;

  @Prop()
  memo: string;

  @Prop({ default: false })
  instantSmsNotification: boolean;

  @Prop({ default: false })
  recurring: boolean;

  // 🔹 STATUS
  @Prop({
    enum: ['draft', 'confirmed', 'completed'],
    default: 'draft',
  })
  status: string;
}

export const WalletPaySchema =
  SchemaFactory.createForClass(WalletPay);