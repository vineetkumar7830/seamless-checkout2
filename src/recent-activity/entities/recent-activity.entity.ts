import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecentActivityDocument = RecentActivity & Document;

@Schema({ timestamps: true })
export class RecentActivity {
  @Prop({
    enum: ['CHECK_CREATED', 'INVOICE_SENT', 'USER_ACTION'],
    required: true,
  })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Modified userId to be Types.ObjectId and optional
  userId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop()
  referenceId?: string;
}

export const RecentActivitySchema =
  SchemaFactory.createForClass(RecentActivity);
