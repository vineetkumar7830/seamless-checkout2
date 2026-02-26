import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export class CreateBankInfoDto {
  @IsString()
  bankName: string;

  @IsString()
  accountNumber: string; 

  @IsString()
  routingNumber: string;

  @IsEnum(VerificationStatus)
  verificationStatus: VerificationStatus;
}
