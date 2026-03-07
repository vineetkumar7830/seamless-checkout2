import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRequestCompanyDto {

  @IsEmail()
  YourEmployerEmail: string;

  @IsEmail()
  ConfirmYourEmployerEmail: string;

  @IsNotEmpty()
  YourEmployerName: string;

  @IsNotEmpty()
  YourEmployerNickName: string;

  @IsNotEmpty()
  RequestedCompanyName: string;

}