import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreateWalletPayDto {

  @IsIn(['pay', 'receive'])
  mode: string;

  @IsIn(['same-day-ach'])
  payAs: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsEmail()
  payeeEmail: string;

  @IsString()
  invoiceNumber: string;

  @IsString()
  payeeAccountNumber: string;

  @IsString()
  payeeBankAccount: string;

  @IsString()
  category: string;

  @IsString()
  memo: string;

  @IsBoolean()
  instantSmsNotification: boolean;

  @IsBoolean()
  recurring: boolean;
}
