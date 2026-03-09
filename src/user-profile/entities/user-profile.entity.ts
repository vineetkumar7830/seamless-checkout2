import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true })
export class UserProfile {

  @Prop({ required: true })
  userId: string;

  // company dropdown value
  @Prop()
  company: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  // profile image
  @Prop()
  logo: string;

  @Prop()
  ssn: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  postalCode: string;

  @Prop()
  country: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);