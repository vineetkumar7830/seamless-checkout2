import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddNewBankAccountDocument =
  AddNewBankAccount & Document;

export enum CountryType {
  USA = 'USA',
  CANADA = 'Canada',
}

@Schema({ timestamps: true })
export class AddNewBankAccount {

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ enum: CountryType, required: true })
  country: CountryType;

  // USA
  @Prop()
  routingNumber?: string;

  // Canada
  @Prop()
  transitNumber?: string;

  @Prop()
  financialInstitutionNumber?: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  confirmAccountNumber: string;

  @Prop({ required: true })
  accountType: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2?: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipOrPostalCode: string;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  bankStreetAddress: string;

  @Prop({ required: true })
  bankCity: string;

  @Prop({ required: true })
  bankState: string;

  @Prop({ required: true })
  bankZipOrPostalCode: string;

  @Prop()
  startingCheckNumber?: string;

  @Prop()
  fractionalNumber?: string;
}

export const AddNewBankAccountSchema =
  SchemaFactory.createForClass(AddNewBankAccount);