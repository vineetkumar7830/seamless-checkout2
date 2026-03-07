import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop()
  logo: string;

@Prop({ required: true })
companyName: string;
  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop()
  country: string;

  @Prop()
  entityType: string;

  @Prop()
  dba: string;

  @Prop()
  formationDate: string;

  @Prop()
  industryType: string;

  @Prop()
  ein: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);