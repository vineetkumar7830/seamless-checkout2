import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  COMPANY_ADMIN = 'company_admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean; 
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
    