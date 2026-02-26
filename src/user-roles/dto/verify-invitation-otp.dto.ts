import { IsString } from 'class-validator';

export class VerifyInvitationOtpDto {
    @IsString()
    otp: string;
}
