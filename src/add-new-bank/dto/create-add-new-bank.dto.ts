import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddNewBankDto {

  @IsNotEmpty()
  @IsString()
  routingNumber: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  confirmAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  nameOnAccount: string;

  @IsNotEmpty()
  @IsString()
  nickName: string;

  @IsNotEmpty()
  @IsString()
  addressLine1: string;

}