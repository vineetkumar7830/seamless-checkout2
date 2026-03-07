import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestCompanyDocument = RequestCompany & Document;

@Schema({ timestamps: true })
export class RequestCompany {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  YourEmployerEmail: string;

  @Prop({ type: String, required: true })
  ConfirmYourEmployerEmail: string;

  @Prop({ type: String, required: true })
  YourEmployerName: string;

  @Prop({ type: String, required: true })
  YourEmployerNickName: string;

  @Prop({ type: String, required: true })
  RequestedCompanyName: string;

  // ✅ FIXED OTP FIELD
  @Prop({ type: String, default: '' })
  otp: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
}

export const RequestCompanySchema =
  SchemaFactory.createForClass(RequestCompany);