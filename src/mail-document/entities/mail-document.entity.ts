import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type MailDocumentDocument = MailDocument & Document;

@Schema({ _id: false })
export class Recipient {

  @Prop({ required: true })
  fileName: string;

  // ✅ FIXED (must match Addaddress exactly)
  @Prop({ type: Types.ObjectId, ref: 'Addaddress', required: true })
  from: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payee', required: true })
  payee: Types.ObjectId;

  @Prop({ required: true })
  shippingType: string;

  @Prop({ required: true })
  shippingPrice: number;
}

@Schema({ timestamps: true })
export class MailDocument {

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  // ✅ FIXED HERE ALSO
  @Prop({ type: Types.ObjectId, ref: 'Addaddress' })
  defaultFrom: Types.ObjectId;

  @Prop()
  defaultShippingType: string;

  @Prop({ type: [Recipient], default: [] })
  recipients: Recipient[];

  @Prop({ default: 0 })
  totalShippingCost: number;
}

export const MailDocumentSchema =
  SchemaFactory.createForClass(MailDocument);
