import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateCheckDto {

  @IsString()
  payeeId: string;

  @IsString()
  payeeName: string;

  @IsString()
  bankAccountId: string;

  @IsString()
  bankName: string;

  @IsString()
  bankMaskedNumber: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  issueDate: string;

  @IsString()
  memo: string;
}
