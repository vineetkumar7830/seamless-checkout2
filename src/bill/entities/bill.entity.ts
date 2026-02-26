import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bill extends Document {

  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
  bankAccountId: Types.ObjectId;

  @Prop({ required: true })
  invoiceNo: string;

  @Prop()
  poNo: string;

  @Prop({ required: true })
  invoiceDate: Date;

  @Prop()
  dueDate: Date;

  @Prop({ default: 0 })
  amount: number;

  @Prop()
  accountNo: string;

  @Prop()
  memo: string;

  @Prop({ required: true })
  category: string;

  @Prop({
    type: [
      {
        itemName: String,
        description: String,
        quantity: Number,
        unitCost: Number,
        total: Number,
      },
    ],
    default: [],
  })
  items: {
    itemName: string;
    description: string;
    quantity: number;
    unitCost: number;
    total: number;
  }[];

  @Prop({ default: 0 })
  vendorCreditUsed: number;

  @Prop({ default: 0 })
  billTotal: number;

  @Prop({ enum: ['draft', 'saved'], default: 'saved' })
  status: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);