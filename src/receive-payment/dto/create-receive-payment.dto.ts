import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateReceivePaymentDto {

  @IsIn(['payee', 'email', 'sms'])
  receiveFrom: string;

  @IsOptional()
  @IsString()
  payeeId?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  mobileNo?: string;

  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  memo: string;

  @IsString()
  editable: string;

  @IsString()
  recurring: string;
}
