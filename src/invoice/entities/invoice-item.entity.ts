import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class InvoiceItem {
  @Prop() sn: number;
  @Prop() item: string;
  @Prop() description: string;
  @Prop() qty: number;
  @Prop() unitCost: number;
  @Prop() discount: number;
  @Prop() total: number;
  @Prop() discountAmount: number;
  @Prop() itemTotal: number;
}

export const InvoiceItemSchema =
  SchemaFactory.createForClass(InvoiceItem);
