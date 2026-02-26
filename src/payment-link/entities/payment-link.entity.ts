import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentLinkDocument = PaymentLink & Document;

@Schema({ timestamps: true })
export class PaymentLink {

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })

  @Prop({ type: Types.ObjectId, required: true })
  receivingBankAccountId: Types.ObjectId;

  @Prop()
  companyName: string;

  @Prop()
  comments: string;

  @Prop()
  logo: string;

  @Prop({ default: false }) paypal: boolean;
  @Prop({ default: false }) stripe: boolean;
  @Prop({ default: false }) stripeCheckout: boolean;

  @Prop({ default: false })
  enableRequiredDocumentTypes: boolean;

  @Prop({ type: [String], default: [] })
  requiredDocumentTypes: string[];

  @Prop({ required: true })
  paymentLinkPath: string;

  @Prop({ required: true })
  fullPaymentUrl: string;

  @Prop({ default: false })
  autoRedirect: boolean;

  @Prop()
  redirectUrl: string;

  @Prop({ default: false })
  setExpiryRules: boolean;

  @Prop()
  expirationDate: Date;

  @Prop()
  maximumPaymentsAllowed: number;

  @Prop({ default: 0 })
  currentPaymentsCount: number;

  @Prop()
  totalPaymentCap: number;

  @Prop({ default: false }) requireBankVerification: boolean;
  @Prop({ default: false }) addTransactionFeeToCustomer: boolean;
  @Prop({ default: false }) requireCompanyName: boolean;
  @Prop({ default: false }) requireAddress: boolean;
  @Prop({ default: false }) requireCheckNumber: boolean;
}

export const PaymentLinkSchema =
  SchemaFactory.createForClass(PaymentLink);

PaymentLinkSchema.index(
  { companyId: 1, paymentLinkPath: 1 },
  { unique: true },
);
