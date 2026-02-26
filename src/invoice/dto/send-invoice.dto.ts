import { IsEmail, IsString } from 'class-validator';

export class SendInvoiceDto {
  @IsString() invoiceId: string;
  @IsEmail() email: string;
}

