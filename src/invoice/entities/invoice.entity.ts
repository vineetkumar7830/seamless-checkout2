import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InvoiceItem, InvoiceItemSchema } from './invoice-item.entity';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ type: String })
  bankAccountId: string;

  @Prop({ type: String })
  payerId: string;

  @Prop({ type: String })
  invoiceNo: string;

  @Prop({ type: String })
  poNumber?: string;

  @Prop({ type: String })
  accNumber?: string;

  @Prop({ type: String })
  invoiceDate: string;

  @Prop({ type: String })
  dueDate: string;

  @Prop({ type: [InvoiceItemSchema], default: [] })
  items: InvoiceItem[];

  @Prop({ type: String })
  privateNote?: string;

  @Prop({ type: String })
  memo?: string;

  @Prop({ type: String })
  taxId?: string;

  @Prop({ type: Number, default: 0 })
  appliedCredit?: number;

  @Prop({ type: Number, default: 0 })
  subTotal: number;

  @Prop({ type: Number, default: 0 })
  discountTotal: number;

  @Prop({ type: Number, default: 0 })
  taxTotal: number;

  @Prop({ type: Number, default: 0 })
  invoiceTotal: number;

  @Prop({ type: Number, default: 0 })
  grandTotal: number;

  @Prop({ type: String, default: null })
  logoUrl?: string;


  @Prop({ type: String })
  customerName?: string;

  @Prop({ type: String })
  customerMobile?: string;

  @Prop({ type: String })
  customerAddress?: string;

  @Prop({ type: String })
  bankName?: string;

  @Prop({ type: String })
  accountHolderName?: string;

  @Prop({ type: String })
  ifscCode?: string;

  @Prop({ type: String })
  accountNumber?: string;

  @Prop({ type: Number, default: 0 })
  amountReceived?: number;

  @Prop({ type: Number, default: 0 })
  balanceDue?: number;

  @Prop({ type: String })
  invoiceNote?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
