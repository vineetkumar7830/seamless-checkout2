import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddaddressDocument = Addaddress & Document;

@Schema({ timestamps: true })
export class Addaddress {

  @Prop({ required: true })
  name: string;

  @Prop()
  companyName: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  zip: string;

  // ✅ EMAIL REQUIRED
  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  userId: string;
}

export const AddaddressSchema =
  SchemaFactory.createForClass(Addaddress);
