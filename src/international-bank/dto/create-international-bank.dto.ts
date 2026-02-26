import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateInternationalBankDto {

  @IsString()
  @IsNotEmpty()
  beneficiaryBankCountry: string;

  @IsString()
  @IsNotEmpty()
  accountType: string;

  @ValidateIf(o => o.beneficiaryBankCountry === 'India')
  @IsString()
  @IsNotEmpty()
  accountNo: string;

  @ValidateIf(o => o.beneficiaryBankCountry === 'India')
  @IsString()
  @IsNotEmpty()
  ifscCode: string;

  @ValidateIf(o => o.beneficiaryBankCountry !== 'India')
  @IsString()
  @IsNotEmpty()
  iban: string;

  @ValidateIf(o => o.beneficiaryBankCountry !== 'India')
  @IsString()
  @IsNotEmpty()
  routingCode: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  beneficiaryRelationship: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  addressLine2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  AddressLine1: string;

  @IsOptional()
  AddressLine2: string;

  @IsString()
  @IsNotEmpty()
  City: string;

  @IsString()
  @IsNotEmpty()
  State: string;

  @IsString()
  @IsNotEmpty()
  Zip: string;

  @IsString()
  @IsNotEmpty()
  Country: string;
}
