import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class InvoiceAttachment {
  @Prop() invoiceId: string;
  @Prop() fileUrl: string;
}

export const InvoiceAttachmentSchema =
  SchemaFactory.createForClass(InvoiceAttachment);
