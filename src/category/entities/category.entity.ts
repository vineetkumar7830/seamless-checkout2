import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {

  // 🔐 SaaS / Tenant
  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;

  // Category Name
  @Prop({ required: true, trim: true })
  name: string;

  // income / expense
  @Prop({ required: true, enum: ['income', 'expense'] })
  type: 'income' | 'expense';

  // Active / Inactive
  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
