import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestCompanyDocument = RequestCompany & Document;

@Schema({ timestamps: true })
export class RequestCompany {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  YourEmployerEmail: string;

  @Prop({ required: true })
  ConfirmYourEmployerEmail: string;

  @Prop({ required: true })
  YourEmployerName: string;

  @Prop({ required: true })
  YourEmployerNickName: string;

  @Prop({ required: true })
  RequestedCompanyName: string;

  @Prop({ default: '' })
  otp: string;

  @Prop({ default: false })
  isVerified: boolean;

}

export const RequestCompanySchema =
  SchemaFactory.createForClass(RequestCompany);