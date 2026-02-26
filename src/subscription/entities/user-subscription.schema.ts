import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserSubscriptionDocument = UserSubscription & Document;

@Schema({ timestamps: true })
export class UserSubscription {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Plan' })
  planId: Types.ObjectId;

  @Prop()
  planName: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: true })
  active: boolean;
}

export const UserSubscriptionSchema =
  SchemaFactory.createForClass(UserSubscription);
