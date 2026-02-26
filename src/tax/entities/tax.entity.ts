import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ✅ Proper document type
export type TaxDocument = Tax & Document;

@Schema({ timestamps: true })
export class Tax {

  // ✅ SAAS FIELD
  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  taxName: string;

  @Prop({ required: true })
  taxPercent: number;

  @Prop()
  note?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);