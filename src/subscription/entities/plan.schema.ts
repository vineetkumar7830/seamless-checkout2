import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema({ timestamps: true })
export class Plan {

  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    required: true,
    enum: ['monthly', 'yearly'],
  })
  billingCycle: string;

  @Prop({
    type: [String],
    required: true,
    default: [],
  })
  features: string[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
