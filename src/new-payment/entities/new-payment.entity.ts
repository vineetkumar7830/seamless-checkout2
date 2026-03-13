import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {

  @Prop({ required: true })
  userId: string;

  @Prop({ enum: ['card','wallet','bank'], required: true })
  payFrom: string;

  @Prop()
  bankAccount: string;

  @Prop({ required: true })
  payee: string;


  @Prop({ default: 0 })
  amount: number;

  @Prop()
  issueDate: Date;

  @Prop()
  category: string;

  @Prop()
  checkNumber: string;

  @Prop()
  payeeId: string;

  @Prop()
  invoiceNumber: string;

  @Prop()
  internalNote: string;

  @Prop()
  memo: string;

  @Prop({
    type: {
      amount: { type: Boolean, default: false },
      sign: { type: Boolean, default: false },
      payee: { type: Boolean, default: false },
      date: { type: Boolean, default: false },
    },
    default: {
      amount: false,
      sign: false,
      payee: false,
      date: false
    }
  })
  processWithout: {
    amount: boolean;
    sign: boolean;
    payee: boolean;
    date: boolean;
  };

  @Prop([
    {
      invoiceDate:String,
      invoiceNumber:String,
      description:String,
      gross:Number,
      discount:Number,
      net:Number,
      thisPayment:Number
    }
  ])
  remittance:any[]

  @Prop([String])
  attachments:string[]

  @Prop([String])
  notes:string[]

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);