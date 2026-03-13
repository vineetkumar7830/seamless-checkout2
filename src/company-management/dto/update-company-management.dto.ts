import { IsString, IsOptional } from 'class-validator';

export class UpdateCompanyManagementDto {

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsString()
  dba?: string;

  @IsOptional()
  @IsString()
  formationDate?: string;

  @IsOptional()
  @IsString()
  industryType?: string;

  @IsOptional()
  @IsString()
  ein?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  signatureUrl?: string;
}