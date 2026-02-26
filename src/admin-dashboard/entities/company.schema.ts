import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean; // 🔥 disable company
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
