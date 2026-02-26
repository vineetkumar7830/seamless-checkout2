import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PayFromType, PayAsType } from '../entities/bulk-pay.entity';

/* ---------------- Payment Row DTO ---------------- */

class PaymentRowDto {

  @IsEnum(PayFromType)
  payFrom: PayFromType;

  @IsEnum(PayAsType)
  payAs: PayAsType;

  @IsMongoId()
  sourceId: string;

  @IsMongoId()
  payTo: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  memo?: string;
}

/* ---------------- Main Create DTO ---------------- */

export class CreateBulkPayDto {

  @IsEnum(PayFromType)
  payFrom: PayFromType;

  @IsEnum(PayAsType)
  payAs: PayAsType;

  @IsMongoId()
  sourceId: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentRowDto)
  payments: PaymentRowDto[];
}