import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyLimitDocument = CompanyLimit & Document;

@Schema({ timestamps: true })
export class CompanyLimit {

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true, default: 1 })
  maxUsers: number;

  @Prop({ required: true, default: 100 })
  monthlyCheckLimit: number;

  @Prop({ required: true, default: 1000 })
  invoiceVolumeLimit: number;
}

export const CompanyLimitSchema = SchemaFactory.createForClass(CompanyLimit);
