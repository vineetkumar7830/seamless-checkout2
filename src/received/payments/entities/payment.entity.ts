import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentReceivedDocument = PaymentReceived & Document;

@Schema({ timestamps: true })
export class PaymentReceived {

  @Prop({ required: true })
  customer_name: string;

  @Prop()
  customer_email: string;

  @Prop()
  customer_phone: string;

  @Prop({ required: true, enum: ['USA', 'CANADA'] })
  country: 'USA' | 'CANADA';

  @Prop({ required: true })
  address_line1: string;

  @Prop()
  address_line2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  postal_code: string;

  @Prop({ required: true, enum: ['check', 'ach', 'cash', 'card'] })
  payment_method: 'check' | 'ach' | 'cash' | 'card';

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'USD', enum: ['USD', 'CAD'] })
  currency: 'USD' | 'CAD';

  @Prop()
  reference_number: string;

  @Prop()
  memo: string;

  @Prop({ required: true })
  deposit_account: string;

  @Prop()
  invoice_number: string;

  @Prop({ default: 'received', enum: ['received', 'pending', 'failed'] })
  status: 'received' | 'pending' | 'failed';

  @Prop()
  received_by: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const PaymentReceivedSchema =
  SchemaFactory.createForClass(PaymentReceived);
