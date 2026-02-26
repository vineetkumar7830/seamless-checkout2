import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreatePaymentReceivedDto {

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsEmail()
  @IsOptional()
  customer_email?: string;

  @IsOptional()
  customer_phone?: string;

  @IsIn(['USA', 'CANADA'])
  country: 'USA' | 'CANADA';

  @IsString()
  address_line1: string;

  @IsOptional()
  address_line2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsIn(['check', 'ach', 'cash', 'card'])
  payment_method: 'check' | 'ach' | 'cash' | 'card';

  @IsNumber()
  amount: number;

  @IsIn(['USD', 'CAD'])
  currency: 'USD' | 'CAD';

  @IsOptional()
  reference_number?: string;

  @IsOptional()
  memo?: string;

  @IsString()
  deposit_account: string;

  @IsOptional()
  invoice_number?: string;
}
