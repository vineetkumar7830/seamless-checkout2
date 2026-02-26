import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  vendorId: string;

  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  invoiceNo: string;

  @IsDateString()
  invoiceDate: string;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  accountNo: string;

  @IsString()
  memo: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(0)
  vendorCreditUsed: number;
}
