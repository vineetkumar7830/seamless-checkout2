import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckDocument = Check & Document;

@Schema({ timestamps: true })
export class Check {

  // Payee & Bank
  @Prop({ required: true })
  payeeId: string;

  @Prop({ required: true })
  payeeName: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  bankAccountId: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  bankMaskedNumber: string;

  // Check Info
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  issueDate: Date;

  @Prop()
  memo: string;

  // Template Editor
  @Prop()
  layoutSelection: string;

  @Prop()
  logoPlacement: string;

  @Prop()
  fontFamily: string;

  @Prop()
  fontColor: string;

  @Prop()
  backgroundColor: string;

  @Prop({ default: false })
  saveTemplate: boolean;

  @Prop({ default: false })
  duplicateTemplate: boolean;
  @Prop({ enum: ['draft', 'pending', 'approved', 'rejected'], default: 'draft' })
  approvalStatus: string;

  @Prop()
  approvedBy: string;

  @Prop()
  rejectionReason: string;


  @Prop({ default: false })
  pdfDownloaded: boolean;

  @Prop({ default: false })
  printed: boolean;

  @Prop()
  printSettings: string;

  @Prop()
  pdfUrl: string;
}

export const CheckSchema = SchemaFactory.createForClass(Check);
