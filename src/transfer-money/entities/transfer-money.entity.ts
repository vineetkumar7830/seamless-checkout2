import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transfer extends Document {

  // ✅ SaaS Tenant
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  // ✅ Kis user ne transfer kiya
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  // 💰 AMOUNT
  @Prop({ required: true })
  amount: number;

  @Prop()
  memo: string;

  // 🔻 FROM
  @Prop({ enum: ['wallet'], required: true })
  fromType: string;

  @Prop({ required: true })
  fromWalletId: string;

  // 🔺 TO
  @Prop({
    enum: ['wallet', 'cloud-bank', 'account'],
    required: true,
  })
  toType: string;

  @Prop()
  toWalletId: string;

  @Prop()
  toCloudBankId: string;

  @Prop()
  toAccountId: string;

  // 🔹 STATUS
  @Prop({
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  })
  status: string;
}

export const TransferSchema =
  SchemaFactory.createForClass(Transfer);