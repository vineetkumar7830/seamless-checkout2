import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CreditPay extends Document {

  // 🔹 SaaS Company
  @Prop({ required: true })
  companyId: string;

  // 🔹 PAY / RECEIVE
  @Prop({ enum: ['pay', 'receive'], default: 'pay' })
  mode: string;

  // 🔹 PAY FROM / PAY AS
  @Prop({ default: 'credit-card' })
  payFrom: string;

  @Prop({ enum: ['ach', 'direct-deposit'], required: true })
  payAs: string;

  @Prop({ required: true })
  amount: number;

  // 🔹 CARD + PAYEE
  @Prop({ required: true })
  cardId: string;

  @Prop({ required: true })
  payeeId: string;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  payeeEmail: string;

  @Prop()
  payeeBankAccount: string;

  @Prop()
  payeeAccountNumber: string;

  @Prop()
  category: string;

  @Prop({ required: true })
  memo: string;

  // 🔹 EXTRA
  @Prop({ default: false })
  instantSmsNotification: boolean;

  // 🔹 STATUS
  @Prop({
    enum: ['draft', 'confirmed', 'completed'],
    default: 'draft',
  })
  status: string;
}

export const CreditPaySchema =
  SchemaFactory.createForClass(CreditPay);