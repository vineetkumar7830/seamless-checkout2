import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SendLinkPayeeDocument = SendLinkPayee & Document;

@Schema({ timestamps: true })
export class SendLinkPayee {

  // ✅ SaaS (company wise data)
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  // 🔹 MODE
  @Prop({ default: 'sendLink' })
  addMode: string;

  // 🔹 PAYEE TYPE
  @Prop({
    enum: ['customer', 'vendor', 'employee'],
    required: true,
  })
  payeeType: string;

  // 🔹 CONTACT
  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  // 🔹 REQUEST BANK ACCOUNT
  @Prop({ default: false })
  requestBankAccount: boolean;

  // 🔹 SHARE LINK
  @Prop({ required: true })
  shareLink: string;

  // 🔹 STATUS
  @Prop({
    enum: ['sent', 'opened', 'completed'],
    default: 'sent',
  })
  status: string;

  // ✅ Optional: expiry for link (recommended)
  @Prop()
  expiresAt?: Date;
}

export const SendLinkPayeeSchema = SchemaFactory.createForClass(SendLinkPayee);
