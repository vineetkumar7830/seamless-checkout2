import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionBillingDocument =
  SubscriptionBilling & Document;

@Schema({ timestamps: true })
export class SubscriptionBilling {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  country: string;

  @Prop({ default: false })
  isPaid: boolean;
}

export const SubscriptionBillingSchema =
  SchemaFactory.createForClass(SubscriptionBilling);