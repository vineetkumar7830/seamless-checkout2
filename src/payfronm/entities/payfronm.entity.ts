import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PayFrom extends Document {

  // 🔥 SaaS: Company link
  @Prop({ required: true, index: true })
  companyId: string;

  @Prop({ required: true })
  payFrom: string;

  @Prop({ required: true })
  payAs: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  bankAccountId: string;

  @Prop({ required: true })
  payeeId: string;

  @Prop({ required: true })
  checkNumber: string;

  @Prop()
  payeeAccountNumber: string;

  @Prop()
  invoiceNumber: string;

  @Prop({ required: true })
  dateOfIssue: Date;

  @Prop()
  category: string;

  @Prop()
  memo: string;

  @Prop({ default: false })
  processWithout: boolean;

  // 🔥 Button action
  @Prop({
    enum: ['save', 'send', 'print', 'direct-deposit'],
    default: 'save',
  })
  action: string;

  // 🔥 Status flow
  @Prop({
    enum: ['draft', 'sent', 'printed', 'deposited'],
    default: 'draft',
  })
  status: string;
}

export const PayFromSchema = SchemaFactory.createForClass(PayFrom);