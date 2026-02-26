import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserRoleDocument = UserRoleEntity & Document;

@Schema({ timestamps: true })
export class UserRoleEntity {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  fullLegalName: string;

  @Prop({ required: true })
  nickName: string;

  // ❌ remove unique true
  @Prop({ required: true })
  userEmail: string;

  @Prop({
    enum: ['Add User', 'Add Your Accountant', 'Add Clerk', 'Add Approver'],
    required: true,
  })
  userType: string;

  @Prop({ default: 'PENDING', enum: ['PENDING', 'ACTIVE', 'EXPIRED'] })
  invitationStatus: string;

  @Prop()
  otp?: string;

  @Prop()
  otpExpires?: Date;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleEntity);

// ✅ compound unique index (SaaS safe)
UserRoleSchema.index({ userEmail: 1, companyId: 1 }, { unique: true });