// src/fund-wallet/entities/fund-wallet.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FundTransaction extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: ['ACH', 'WIRE'], required: true })
  method: 'ACH' | 'WIRE';

  @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
  bankAccountId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
  walletId: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 20 })
  amount: number;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop()
  signatureName?: string;

  @Prop()
  digitalSignature?: string;

  @Prop({ default: 'pending', enum: ['pending', 'completed', 'failed'] })
  status: 'pending' | 'completed' | 'failed';
}

export const FundTransactionSchema =
  SchemaFactory.createForClass(FundTransaction);