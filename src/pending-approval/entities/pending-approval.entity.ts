import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PendingApprovalDocument = PendingApproval & Document;

@Schema({ timestamps: true })
export class PendingApproval {

  @Prop({ required: true })
  entityType:
    | 'check-issued'
    | 'invoice-sent'
    | 'payment-received'
    | 'bill-payment';

  @Prop({ required: true })
  entityId: string;


  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'USD' })
  currency: 'USD' | 'CAD';

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop({ required: true })
  requestedBy: string;

  @Prop()
  actionBy?: string;

  @Prop()
  actionAt?: Date;

  @Prop()
  remarks?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;
}

export const PendingApprovalSchema =
  SchemaFactory.createForClass(PendingApproval);
