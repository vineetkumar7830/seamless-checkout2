import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../user/entities/user.entity';

export type LoginAuditDocument = LoginAudit & Document;

@Schema({ timestamps: true })
export class LoginAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  userId?: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ enum: Object.values(UserRole) })
  role: UserRole;

  @Prop({ required: true })
  ip: string;

  @Prop()
  userAgent?: string;

  @Prop({ enum: ['SUCCESS', 'FAILED'], required: true })
  status: 'SUCCESS' | 'FAILED';

  @Prop()
  reason?: string;

  // 🔹 PAYEE DETAILS
  @Prop({
    type: {
      payeeId: String,
      payeeName: String,
      payeeEmail: String,
    },
    default: null,
  })
  payee?: {
    payeeId: string;
    payeeName: string;
    payeeEmail: string;
  };

  
  @Prop({ type: Number, default: null })
  amount?: number;

  @Prop({ type: Date, default: null })
  transactionDate?: Date;
}

export const LoginAuditSchema = SchemaFactory.createForClass(LoginAudit);
