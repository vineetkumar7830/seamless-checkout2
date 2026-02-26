import {IsNotEmpty,IsString,IsNumber,IsDateString,IsOptional,IsIn,} from 'class-validator';

export class CreateCashExpenseDto {

  @IsString()
  @IsNotEmpty()
  cashAccount: string;

  @IsString()
  @IsNotEmpty()
  payee: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';

  @IsString()
  @IsNotEmpty()
  cashExpenseNo: string;

  @IsOptional()
  accountNumber?: string;

  @IsOptional()
  invoiceNumber?: string;

  @IsOptional()
  memo?: string;
}
