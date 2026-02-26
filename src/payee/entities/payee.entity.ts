import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PayeeDocument = Payee & Document;

@Schema({ timestamps: true })
export class Payee {

  // ===== Main Fields =====
  @Prop({ required: true })
  payeeType: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  payeeName: string;

  @Prop({ required: true })
  nickName: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  payeeIdOrAccountNumber?: string;

  @Prop()
  entityType?: string;

  @Prop()
  companyName?: string;

  @Prop({ default: false })
  requestPayeeToAddBankAccount: boolean;


  // ===== Address =====
  @Prop({
    type: {
      addressLine1: String,
      addressLine2: String,
      country: String,
      state: String,
      city: String,
      zip: String,
    },
  })
  address?: {
    addressLine1: string;
    addressLine2?: string;
    country: string;
    state: string;
    city: string;
    zip: string;
  };


  // ===== Bank Account =====
  @Prop({
    type: {
      transactionModes: [String],
      accountHolderName: String,
      routingNumber: String,
      accountNumber: String,
      confirmAccountNumber: String,
      accountType: String,
    },
  })
  bankAccount?: {
    transactionModes: string[];
    accountHolderName: string;
    routingNumber: string;
    accountNumber: string;
    confirmAccountNumber: string;
    accountType: string;
  };


  // ===== International Bank Account =====
  @Prop({
    type: {
      beneficiaryBankCountry: String,
      beneficiaryAddressLine1: String,
      beneficiaryAddressLine2: String,
      city: String,
      state: String,
      zip: String,
    },
  })
  internationalBankAccount?: {
    beneficiaryBankCountry: string;
    beneficiaryAddressLine1: string;
    beneficiaryAddressLine2?: string;
    city: string;
    state: string;
    zip: string;
  };


  // ===== More Info =====
  @Prop({
    type: {
      defaultPayFromBankAccount: String,
      defaultPayCategory: String,
      defaultPayMethod: String,
      firstName: String,
      lastName: String,
      customerType: String,
      businessWebsite: String,
    },
  })
  moreInfo?: {
    defaultPayFromBankAccount: string;
    defaultPayCategory: string;
    defaultPayMethod: string;
    firstName: string;
    lastName: string;
    customerType: string;
    businessWebsite: string;
  };
}

export const PayeeSchema = SchemaFactory.createForClass(Payee);
