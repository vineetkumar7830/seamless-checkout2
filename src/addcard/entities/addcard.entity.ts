import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddCardDocument = AddCard & Document;

@Schema({ timestamps: true })
export class AddCard {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  // 🔥 YE FIELD ADD KIYA HAI (ERROR FIX)
  @Prop()
  cardProvider: string;

  @Prop()
  color: string;

  // STEP 2 FIELDS
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop()
  country: string;

  @Prop()
  cardNumber: string;

  @Prop()
  expiryDate: string;

  @Prop()
  cvv: string;
}

export const AddCardSchema = SchemaFactory.createForClass(AddCard);