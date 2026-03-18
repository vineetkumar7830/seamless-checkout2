import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested
} from "class-validator";

import { Type } from "class-transformer";

/* -----------------------------
   ProcessWithout DTO
------------------------------ */

export class ProcessWithoutDto {

  @IsOptional()
  @IsBoolean()
  amount: boolean;

  @IsOptional()
  @IsBoolean()
  sign: boolean;

  @IsOptional()
  @IsBoolean()
  payee: boolean;

  @IsOptional()
  @IsBoolean()
  date: boolean;

}

/* -----------------------------
   Create Payment DTO
------------------------------ */

export class CreatePaymentDto {

  @IsString()
  payFrom: string;

  @IsOptional()
  @IsString()
  bankAccount: string;

  @IsString()
  payee: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  issueDate: Date;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  checkNumber: string;

  @IsString()
  payeeId: string;

  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @IsOptional()
  @IsString()
  internalNote: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessWithoutDto)
  processWithout: ProcessWithoutDto;

}

/* -----------------------------
   Note DTO (FIXED)
------------------------------ */

export class NoteDto {

  @IsOptional()
  @IsString()
  note: string;

}

/* -----------------------------
   Remittance DTO
------------------------------ */

export class RemittanceDto {

  @IsString()
  invoiceDate: string;

  @IsString()
  invoiceNumber: string;

  @IsString()
  description: string;

  @IsNumber()
  gross: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  net: number;

  @IsNumber()
  thisPayment: number;

}