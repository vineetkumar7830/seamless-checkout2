import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreateCreditPayDto {

  @IsIn(['pay', 'receive'])
  mode: string;

  @IsIn(['ach', 'direct-deposit'])
  payAs: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsEmail()
  payeeEmail: string;

  @IsString()
  payeeBankAccount: string;

  @IsString()
  payeeAccountNumber: string;

  @IsString()
  category: string;

  @IsString()
  @IsNotEmpty()
  memo: string;

  @IsBoolean()
  instantSmsNotification: boolean;
}
    