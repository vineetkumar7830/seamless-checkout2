// src/fund-wallet/dto/fund-ach.dto.ts
import { IsMongoId, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class FundAchDto {
  @IsMongoId()
  bankAccountId: string;

  @IsMongoId()
  walletId: string;

  @IsNumber()
  @Min(20)
  amount: number;

  @IsNotEmpty()
  comment: string;
}
