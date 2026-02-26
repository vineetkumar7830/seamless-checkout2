import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CashExpenseDocument = CashExpense & Document;

@Schema({ timestamps: true })
export class CashExpense {

  @Prop({ type: Types.ObjectId, ref: 'CashAccount', required: true })
  cashAccount: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payee', required: true })
  payee: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, required: true })
  category: Types.ObjectId;

  @Prop({ enum: ['income', 'expense'], required: true })
  type: string;

  @Prop({ required: true })
  cashExpenseNo: string;

  @Prop()
  accountNumber?: string;

  @Prop()
  invoiceNumber?: string;

  @Prop()
  memo?: string;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  // ================= REMITTANCE =================

  @Prop({
    type: [
      {
        invoiceNo: String,
        item: String,
        description: String,
        quantity: Number,
        unitCost: Number,
        total: Number,
      },
    ],
    default: [],
  })
  remittance: {
    invoiceNo: string;
    item: string;
    description: string;
    quantity: number;
    unitCost: number;
    total: number;
  }[];

  @Prop({ type: Number, default: 0 })
  remittanceTotal: number;

  // ================= ATTACHMENTS =================

  @Prop({
    type: [
      {
        fileName: String,
        filePath: String,
        uploadedBy: String,
        uploadedAt: Date,
      },
    ],
    default: [],
  })
  attachments: any[];

  // ================= COMMENTS =================

  @Prop({
    type: [
      {
        user: String,
        comment: String,
        createdAt: Date,
      },
    ],
    default: [],
  })
  comments: any[];
}

export const CashExpenseSchema =
  SchemaFactory.createForClass(CashExpense);
