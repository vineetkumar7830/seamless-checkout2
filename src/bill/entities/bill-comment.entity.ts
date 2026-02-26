import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BillComment extends Document {

  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'Bill', required: true })
  billId: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop()
  user: string;
}

export const BillCommentSchema =
  SchemaFactory.createForClass(BillComment);