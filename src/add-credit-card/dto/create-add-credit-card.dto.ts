import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class AddCreditCardDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zip: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{16}$/)
  cardNumber: string;

  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
  expiryDate: string;

  @IsNotEmpty()
  @Length(3, 4)
  cvv: string;
}
