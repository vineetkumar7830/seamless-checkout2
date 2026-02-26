import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttachmentDocument = Attachment & Document;

@Schema({ timestamps: true })
export class Attachment {

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CheckDraft', required: true, index: true })
  checkDraftId: Types.ObjectId;

  @Prop({ type: String, required: true })
  fileName: string;

  @Prop({ type: String, required: true })
  fileUrl: string;

  @Prop({ type: String })
  mimeType: string;

  @Prop({ type: Number })
  fileSize: number;

  uploadedBy?: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
