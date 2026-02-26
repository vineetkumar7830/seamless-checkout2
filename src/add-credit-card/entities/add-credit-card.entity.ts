import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'add_credit_cards',
})
export class AddCreditCard extends Document {

  // ✅ SaaS Company (Token se aayega)
  @Prop({ required: true })
  companyId: string;

  // 🔗 Logged-in user
  @Prop({ type: Types.ObjectId })
  userId?: Types.ObjectId;

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

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  expiryDate: string;

  @Prop({ required: true })
  cvv: string;

  createdAt: Date;
  updatedAt: Date;
}

export type AddCreditCardDocument = AddCreditCard & Document;
export const AddCreditCardSchema =
  SchemaFactory.createForClass(AddCreditCard);