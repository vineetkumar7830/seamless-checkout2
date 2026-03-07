import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddCompanyDocument = AddCompany & Document;

@Schema({ timestamps: true })
export class AddCompany {

  @Prop({
    required: true,
    trim: true
  })
  companyName: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: Types.ObjectId;
}

export const AddCompanySchema = SchemaFactory.createForClass(AddCompany);