import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '../../company/entities/company.entity';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  // ================= ACCOUNT STATUS =================
  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: String, default: null })
  suspendedReason?: string;

  // ================= ROLE =================
  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  })
  role: UserRole;

  // ================= OTP =================
  @Prop({ type: String, default: null })
  otp?: string;

  @Prop({ type: Date, default: null })
  otpExpires?: Date;

  // ================= RESET PASSWORD =================
  @Prop({ type: String, default: null })
  resetPasswordToken?: string;

  @Prop({ type: Date, default: null })
  resetPasswordExpires?: Date;

  // ================= TENANT LINK =================
  @Prop({ type: Types.ObjectId, ref: 'Company', required: false, index: true, default: null })
  companyId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
