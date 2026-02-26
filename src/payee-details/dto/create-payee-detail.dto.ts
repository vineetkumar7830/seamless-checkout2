import {
  IsString,
  IsEmail,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

// ✅ Address class isi file ke andar bana di
class AddressDto {
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zip: string;
}

export class CreatePayeeDetailsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  nickName?: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  payeeIdOrAccountNumber?: string;

  @IsOptional()
  @IsEnum(['Individual', 'Company'])
  entityType?: 'Individual' | 'Company';

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  // ✅ ERROR YAHI SE SOLVE HOGA
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}