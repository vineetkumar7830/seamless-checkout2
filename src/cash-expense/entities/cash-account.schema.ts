import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CashAccountDocument = CashAccount & Document;

@Schema({ timestamps: true })
export class CashAccount {

  @Prop({ required: true })
  cashAccountName: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true, default: 0 })
  startingBalance: number;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;
}

export const CashAccountSchema = SchemaFactory.createForClass(CashAccount);
