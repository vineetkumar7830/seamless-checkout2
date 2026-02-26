import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserProfileDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  displayName: string;

  @IsOptional()
  phone: string;

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
