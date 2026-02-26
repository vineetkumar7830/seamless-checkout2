import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreatePayeeDto {

  @IsString()
  @IsNotEmpty()
  payeeType: string;

  @IsString()
  @IsNotEmpty()
  payeeName: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  payeeIdOrAccountNumber?: string;

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsBoolean()
  requestPayeeToAddBankAccount?: boolean;


  // ===== Address =====
  @IsOptional()
  address?: {
    addressLine1: string;
    addressLine2?: string;
    country: string;
    state: string;
    city: string;
    zip: string;
  };


  // ===== Bank Account =====
  @IsOptional()
  bankAccount?: {
    transactionModes: string[];
    accountHolderName: string;
    routingNumber: string;
    accountNumber: string;
    confirmAccountNumber: string;
    accountType: string;
  };


  // ===== International Bank Account =====
  @IsOptional()
  internationalBankAccount?: {
    beneficiaryBankCountry: string;
    beneficiaryAddressLine1: string;
    beneficiaryAddressLine2?: string;
    city: string;
    state: string;
    zip: string;
  };


  // ===== More Info =====
  @IsOptional()
  moreInfo?: {
    defaultPayFromBankAccount: string;
    defaultPayCategory: string;
    defaultPayMethod: string;
    firstName: string;
    lastName: string;
    customerType: string;
    businessWebsite: string;
  };
}
