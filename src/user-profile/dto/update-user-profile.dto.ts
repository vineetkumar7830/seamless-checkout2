import { IsOptional } from 'class-validator';

export class UpdateUserProfileDto {

  @IsOptional()
  company: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  displayName: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  logo: string;

  @IsOptional()
  ssn: string;

  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  addressLine1: string;

  @IsOptional()
  addressLine2: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  postalCode: string;

  @IsOptional()
  country: string;
}