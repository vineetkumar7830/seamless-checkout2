import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PayeeDetailsDocument = PayeeDetails & Document;

@Schema({ timestamps: true })
export class PayeeDetails {

  // ✅ SaaS key
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  nickName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  payeeIdOrAccountNumber: string;

  @Prop({ enum: ['Individual', 'Company'], default: 'Individual' })
  entityType: string;

  @Prop() 
  companyName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  taxId: string;

  // Address
  @Prop({
    type: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  })
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

export const PayeeDetailsSchema = SchemaFactory.createForClass(PayeeDetails);
