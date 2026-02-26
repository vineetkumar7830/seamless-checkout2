import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DepositSlipDocument = DepositSlip & Document;

export enum DepositStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  VOIDED = 'VOIDED',
}

@Schema({ _id: false })
export class CashEntry {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  cashierClerk?: Types.ObjectId;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: String, default: 'CASH' })
  type: string;
}

@Schema({ _id: false })
export class CheckEntry {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  from?: Types.ObjectId;

  @Prop({ type: String })
  checkNumber?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  cashierClerk?: Types.ObjectId;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: String, default: 'Business Check' })
  type: string;
}
  
@Schema({ timestamps: true })
export class DepositSlip {

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  bankAccountId: string;

  // ✅ UPDATED
  @Prop({ type: Types.ObjectId, ref: 'Payee' })
  depositFromId?: Types.ObjectId;

  @Prop()
  depositFromName?: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  refId?: string;

  @Prop()
  memo?: string;

  @Prop({ default: false })
  blankDepositSlip: boolean;

  @Prop({ type: [CashEntry], default: [] })
  cashEntries: CashEntry[];

  @Prop({ type: [CheckEntry], default: [] })
  checkEntries: CheckEntry[];

  @Prop({
    type: String,
    enum: DepositStatus,
    default: DepositStatus.UNVERIFIED,
  })
  status: DepositStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  verifiedBy?: Types.ObjectId;

  @Prop()
  verifiedDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  voidedBy?: Types.ObjectId;

  @Prop()
  voidedDate?: Date;
}

export const DepositSlipSchema =
  SchemaFactory.createForClass(DepositSlip);
