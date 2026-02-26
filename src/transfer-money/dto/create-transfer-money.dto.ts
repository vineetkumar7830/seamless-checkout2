import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransferDto {

  // 💰 AMOUNT
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;

  // 📝 MEMO
  @IsOptional()
  @IsString()
  memo?: string;

  // 🔻 FROM
  @IsIn(['wallet'])
  fromType: 'wallet';

  @IsString()
  @IsNotEmpty()
  fromWalletId: string;

  // 🔺 TO TYPE
  @IsIn(['wallet', 'cloud-bank', 'account'])
  toType: 'wallet' | 'cloud-bank' | 'account';

  // 🔺 TO WALLET
  @IsOptional()
  @IsString()
  toWalletId?: string;

  // 🔺 TO CLOUD BANK
  @IsOptional()
  @IsString()
  toCloudBankId?: string;

  // 🔺 TO BANK ACCOUNT
  @IsOptional()
  @IsString()
  toAccountId?: string;
}
