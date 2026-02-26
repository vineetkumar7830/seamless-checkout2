import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankAddDocument = BankAdd & Document;

@Schema({ timestamps: true })
export class BankAdd {

  @Prop({ enum: ['USA', 'CANADA'] })
  country?: string;

  // ================= BUSINESS DETAILS =================

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  // USA
  @Prop()
  zip: string;

  // CANADA
  @Prop()
  postalCode: string;

  // ================= BANK DETAILS =================

  // USA
  @Prop()
  routingNumber: string;

  // CANADA
  @Prop()
  transitNumber: string;

  @Prop()
  financialInstitutionNo: string;

  // ================= ACCOUNT DETAILS =================

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  accountType: string;

  @Prop()
  bankName: string;

  @Prop()
  bankStreetAddress: string;

  @Prop()
  bankCity: string;

  @Prop()
  bankState: string;

  // USA
  @Prop()
  bankZip: string;

  // CANADA
  @Prop()
  bankPostalCode: string;

  @Prop()
  checkNumber: string;

  @Prop()
  fractionalNumber: string;

  @Prop()
  signatureUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', index: true })
  companyId?: Types.ObjectId;
}

export const BankAddSchema = SchemaFactory.createForClass(BankAdd);
