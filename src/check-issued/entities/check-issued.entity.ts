import { VERSION_NEUTRAL } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckIssuedDocument = CheckIssued & Document;

@Schema({ timestamps: true })
export class CheckIssued {

  @Prop({ required: true })
  payeeName: string;

  @Prop()
  payeeEmail?: string;

  @Prop({ required: true })
  bankAccountName: string;

  @Prop({ required: true, unique: true })
  checkNumber: string;

  @Prop({ required: true })
  checkDate: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'USD' })
  currency: 'USD' | 'CAD';

  @Prop()
  memo?: string;

  @Prop()
  category?: string;

  @Prop({ default: 'issued' })
  status:
    | 'issued'
    | 'printed'
    | 'mailed'
    | 'cleared'
    | 'void';

  @Prop()
  issuedBy: string;

  @Prop()
  referenceId?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const CheckIssuedSchema =
  SchemaFactory.createForClass(CheckIssued);
