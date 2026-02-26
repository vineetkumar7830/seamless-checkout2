import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentSettingDocument = PaymentSetting & Document;

@Schema({ timestamps: true })
export class PaymentSetting {

  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  nickName: string;

  @Prop({ required: true, trim: true })
  clientId: string;

  @Prop({ required: true, trim: true })
  secretKey: string;

  @Prop({
    required: true,
    enum: ['live', 'sandbox'],
    lowercase: true,
  })
  mode: 'live' | 'sandbox';

  @Prop({ default: true })
  isActive: boolean;
}

export const PaymentSettingSchema =
  SchemaFactory.createForClass(PaymentSetting);

// 🔥 Important – same company + same mode duplicate nahi hoga
PaymentSettingSchema.index({ companyId: 1, mode: 1 }, { unique: true });
