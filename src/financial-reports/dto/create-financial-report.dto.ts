import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class CreateFinancialReportDto {
  @IsString()
  payeeName: string;

  @IsOptional()
  @IsEmail()
  payeeEmail?: string;

  @IsOptional()
  @IsString()
  payeePhone?: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  transactionDate: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  // ✅ Added to fix previewUrl error
  @IsOptional()
  @IsString()
  previewUrl?: string;
}