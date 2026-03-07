import { IsNotEmpty } from 'class-validator';

export class VerifyRequestCompanyOtpDto {

  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  otp: string;

}