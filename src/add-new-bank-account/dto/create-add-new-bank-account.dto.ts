import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CountryType } from '../entities/add-new-bank-account.entity';

export class CreateBankAccountDto {

  @IsEnum(CountryType)
  country: CountryType;

  @IsOptional()
  routingNumber?: string;

  @IsOptional()
  transitNumber?: string;

  @IsOptional()
  financialInstitutionNumber?: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  confirmAccountNumber: string;

  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  accountName: string;

  @IsNotEmpty()
  nickName: string;

  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  addressLine2?: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipOrPostalCode: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  bankStreetAddress: string;

  @IsNotEmpty()
  bankCity: string;

  @IsNotEmpty()
  bankState: string;

  @IsNotEmpty()
  bankZipOrPostalCode: string;

  @IsOptional()
  startingCheckNumber?: string;

  @IsOptional()
  fractionalNumber?: string;
}