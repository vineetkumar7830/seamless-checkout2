import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceItemDto } from './invoice-item.dto';

export class CreateInvoiceDto {
  // ===== TOP DROPDOWNS =====
  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @IsNotEmpty()
  @IsString()
  payerId: string;

  @IsNotEmpty()
  @IsString()
  invoiceNo: string;

  @IsOptional()
  @IsString()
  poNumber?: string;

  @IsOptional()
  @IsString()
  accNumber?: string;

  @IsNotEmpty()
  @IsString()
  invoiceDate: string;

  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @IsOptional()
  @IsString()
  privateNote?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  @Type(() => Number)
  @IsNumber()
  appliedCredit: number;

  @Type(() => Number)
  @IsNumber()
  subTotal: number;
  
  @Type(() => Number)
  @IsNumber()
  discountTotal: number;

  @Type(() => Number)
  @IsNumber()
  taxTotal: number;

  @Type(() => Number)
  @IsNumber()
  invoiceTotal: number;

  @Type(() => Number)
  @IsNumber()
  grandTotal: number;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  // ===== NEW FIELDS FROM UI ====

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerMobile?: string;

  @IsOptional()
  @IsString()
  customerAddress?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @IsOptional()
  @IsString()
  ifscCode?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  amountReceived?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  balanceDue?: number;

  @IsOptional()
  @IsString()
  invoiceNote?: string;
}
