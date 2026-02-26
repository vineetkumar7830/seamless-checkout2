import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CompanySwitcher {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: false })
  isActive: boolean;

  // ✅ FIXED: explicit type
  @Prop({ type: Date, default: null })
  lastActiveAt: Date | null;
}

export type CompanySwitcherDocument = CompanySwitcher & Document;
export const CompanySwitcherSchema =
  SchemaFactory.createForClass(CompanySwitcher);
