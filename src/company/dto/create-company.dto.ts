import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  website?: string;

  @IsIn(['USA', 'CANADA'])
  country: 'USA' | 'CANADA';

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  addressLine2?: string;

  @IsNotEmpty()
  @Matches(/^(\d{5}|[A-Z]\d[A-Z][ -]?\d[A-Z]\d)$/i, {
    message: 'Invalid ZIP / Postal Code for USA or Canada',
  })
  zipCode: string;
}
