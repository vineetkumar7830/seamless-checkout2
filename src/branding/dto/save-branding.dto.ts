import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class SaveBrandingDto {
  @IsString()
  companyId: string;
  
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  accentColor?: string;

  @IsString()
  @IsOptional()
  defaultCheckTemplate?: string;

  @IsString()
  @IsOptional()
  defaultInvoiceTemplate?: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  applyToChecks?: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  applyToInvoices?: boolean;
}
