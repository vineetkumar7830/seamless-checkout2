import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CreditCard extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2?: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  country: string;

  // ⚠️ normally cardNumber encrypted hota hai
  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  expiryDate: string;

  @Prop({ required: true })
  cvv: string;
}

export const CreditCardSchema =
  SchemaFactory.createForClass(CreditCard);
