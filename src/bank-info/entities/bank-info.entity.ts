import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankInfoDocument = BankInfo & Document;

@Schema({ timestamps: true })
export class BankInfo {
  @Prop({ required: true })
  bankName: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  routingNumber: string;

  @Prop({ enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' })
  verificationStatus: string;
}

export const BankInfoSchema = SchemaFactory.createForClass(BankInfo);
