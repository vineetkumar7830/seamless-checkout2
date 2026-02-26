import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true })
export class UserProfile {

  @Prop({ required: true })
  companyId: string; // SaaS company / workspace

  @Prop({ required: true })
  userId: string; // from token

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
