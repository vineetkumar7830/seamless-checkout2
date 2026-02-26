// verify-email-otp.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}
