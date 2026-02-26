import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
  IsDateString,
  IsNumber,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePaymentLinkDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  receivingBankAccountId: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  // ✅ Boolean Fix
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  paypal?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  stripe?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  stripeCheckout?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  enableRequiredDocumentTypes?: boolean;

  // ✅ ARRAY FIX (Single value bhi chalega)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  })
  @IsArray()
  requiredDocumentTypes?: string[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-]+$/)
  paymentLinkPath: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  autoRedirect?: boolean;

  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  setExpiryRules?: boolean;

  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  // ✅ Number Fix
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maximumPaymentsAllowed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalPaymentCap?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requireBankVerification?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  addTransactionFeeToCustomer?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requireCompanyName?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requireAddress?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requireCheckNumber?: boolean;
}
