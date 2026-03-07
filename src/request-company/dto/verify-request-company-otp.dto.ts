import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyRequestCompanyOtpDto {

  @ApiProperty({ example: '65abc123def456...', description: 'The ID of the request' })
  @IsNotEmpty()
  requestId: string;

  @ApiProperty({ example: '123456', description: 'The 6-digit OTP' })
  @IsNotEmpty()
  otp: string;

}