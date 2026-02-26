// verify-phone-otp.dto.ts
import { IsNotEmpty, Length } from 'class-validator';

export class VerifyPhoneOtpDto {
  @IsNotEmpty()
  @Length(10, 15)
  phone: string;

  @IsNotEmpty()
  otp: string;
}
