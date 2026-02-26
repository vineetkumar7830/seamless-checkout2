import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Otp extends Document {
  // Email or Phone
  @Prop({ required: true })
  target: string;

  // 6-digit OTP
  @Prop({ required: true })
  code: string;

  // email | phone
  @Prop({ enum: ['email', 'phone'], required: true })
  type: 'email' | 'phone';

  // 🔐 SaaS Isolation (VERY IMPORTANT)
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  // Expiry time
  @Prop({ required: true })
  expiresAt: Date;

  // Verification status
  @Prop({ default: false })
  verified: boolean;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

// ================= SaaS Indexing =================

// Company + target + type unique
OtpSchema.index(
  { companyId: 1, target: 1, type: 1 },
  { unique: true },
);

// Auto-delete expired OTP (TTL index)
OtpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);