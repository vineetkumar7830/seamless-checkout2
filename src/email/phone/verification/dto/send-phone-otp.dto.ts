// send-phone-otp.dto.ts
import { IsNotEmpty, Length } from 'class-validator';

export class SendPhoneOtpDto {
  @IsNotEmpty()
  @Length(10, 15)
  phone: string;
}
