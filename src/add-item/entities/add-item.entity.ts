import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Item extends Document {

  // 🔐 SaaS / Tenant
  @Prop({ type: Types.ObjectId, required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  unitPrice: number;

  @Prop()
  description?: string;

  @Prop()
  privateNote?: string;

  @Prop({ default: false })
  trackProduct: boolean;

  @Prop({ default: 0 })
  stockQuantity: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
