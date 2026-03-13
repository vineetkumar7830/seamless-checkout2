import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddNewBankDocument = AddNewBank & Document;

@Schema({ timestamps: true })
export class AddNewBank {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  routingNumber: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  nameOnAccount: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  addressLine1: string;

}

export const AddNewBankSchema = SchemaFactory.createForClass(AddNewBank);