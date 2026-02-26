import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InternationalBankDocument = InternationalBank & Document;

@Schema({ timestamps: true })
export class InternationalBank {

  @Prop({ required: true })
  beneficiaryBankCountry: string;

  @Prop({ required: true })
  accountType: string;

  // India
  @Prop()
  accountNo: string;

  @Prop()
  ifscCode: string;

  @Prop()
  iban: string;

  @Prop()
  routingCode: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  beneficiaryRelationship: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zip: string;

  // Beneficiary Details
  @Prop({ required: true })
  AddressLine1: string;

  @Prop()
  AddressLine2: string;

  @Prop({ required: true })
  City: string;

  @Prop({ required: true })
  State: string;

  @Prop({ required: true })
  Zip: string;

  @Prop({ required: true })
  Country: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
  
}

export const InternationalBankSchema =
  SchemaFactory.createForClass(InternationalBank);
