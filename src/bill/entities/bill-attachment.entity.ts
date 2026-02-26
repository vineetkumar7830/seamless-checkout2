import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BillAttachment extends Document {

  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;  

  @Prop({ type: Types.ObjectId, ref: 'Bill', required: true })
  billId: Types.ObjectId;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  fileName: string;

  @Prop()
  uploadedBy: string;
}

export const BillAttachmentSchema =
  SchemaFactory.createForClass(BillAttachment);