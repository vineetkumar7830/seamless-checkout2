// send-email-otp.dto.ts
import { IsEmail } from 'class-validator';

export class SendEmailOtpDto {
  @IsEmail()
  email: string;
}
