// src/fund-wallet/dto/fund-wire.dto.ts
import { IsMongoId, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class FundWireDto {
  @IsMongoId()
  bankAccountId: string;

  @IsMongoId()
  walletId: string;

  @IsNumber()
  @Min(20)
  amount: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  signatureName: string;

  @IsNotEmpty()
  digitalSignature: string;
}
