import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateAddaddressDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  // ✅ VALID EMAIL REQUIRED
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
