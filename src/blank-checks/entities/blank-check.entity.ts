import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BlankCheckDocument = BlankCheck & Document;

@Schema({ timestamps: true })
export class BlankCheck {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
  bankAccountId: Types.ObjectId;

  @Prop({ required: true })
  numberOfChecks: number;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;

  @Prop({ default: true })
  includeSignature: boolean;

}

export const BlankCheckSchema = SchemaFactory.createForClass(BlankCheck);