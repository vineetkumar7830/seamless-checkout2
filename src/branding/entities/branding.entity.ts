import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BrandingDocument = Branding & Document;

@Schema({ timestamps: true })
export class Branding {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ default: '' })
  logoUrl: string;

  @Prop({ default: '' })
  primaryColor: string;

  @Prop({ default: '' })
  secondaryColor: string;

  @Prop({ default: '' })
  accentColor: string;

  @Prop({ default: 'classic' })
  defaultCheckTemplate: string;

  @Prop({ default: 'classic' })
  defaultInvoiceTemplate: string;

  @Prop({ default: true })
  applyToChecks: boolean;

  @Prop({ default: true })
  applyToInvoices: boolean;
}

export const BrandingSchema = SchemaFactory.createForClass(Branding);
