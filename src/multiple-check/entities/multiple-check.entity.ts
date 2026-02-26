import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MultipleCheckDocument = MultipleCheck & Document;

@Schema({ _id: false })
export class CheckItem {

  @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
  accountId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payee', required: true })
  payeeId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  issueDate: Date;

  @Prop()
  memo: string;

  @Prop()
  note: string;

  @Prop()
  accountNumber: string; // Ac#

  @Prop()
  invoiceNumber: string; // Inv#

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;
}

export const CheckItemSchema = SchemaFactory.createForClass(CheckItem);

@Schema({ timestamps: true })
export class MultipleCheck {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
  selectBankAccount: Types.ObjectId;

  @Prop({ required: true })
  baseAmount: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  memo: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  selectCategory: Types.ObjectId;

  @Prop({ type: [CheckItemSchema], default: [] })
  checks: CheckItem[];

  @Prop({ default: 0 })
  totalItem: number;

  @Prop({ default: 0 })
  totalAmount: number;
}

export const MultipleCheckSchema =
  SchemaFactory.createForClass(MultipleCheck);