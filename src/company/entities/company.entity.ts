import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  // ✅ ADD THIS (VERY IMPORTANT)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  website: string;

  @Prop({ required: true, enum: ['USA', 'CANADA'] })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop()
  logoUrl: string;

  @Prop()
  signatureUrl: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String })
  planId: string;

  @Prop({ type: [String], default: [] })
  addonIds: string[];

  @Prop({ type: Date })
  planPurchasedAt: Date;

  @Prop({
    type: String,
    enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'],
    default: 'ACTIVE',
  })
  planStatus: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
