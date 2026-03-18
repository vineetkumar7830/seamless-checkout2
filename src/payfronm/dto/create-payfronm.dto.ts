import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePayFromDto {

  @IsString()
  @IsNotEmpty()
  payFrom: string;

  @IsString()
  @IsNotEmpty()
  payAs: string;

  // 🔥 FIX: number conversion issue solve
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsString()
  @IsNotEmpty()
  checkNumber: string;

  @IsOptional()
  @IsString()
  payeeAccountNumber?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  // 🔥 DATE FIX (already correct but cleaned)
  @IsNotEmpty()
  @IsDateString()
  dateOfIssue: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  // 🔥 FIX: boolean conversion issue solve
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  processWithout?: boolean;
}