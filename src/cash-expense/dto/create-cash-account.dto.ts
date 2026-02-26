import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCashAccountDto {

  @IsString()
  @IsNotEmpty()
  cashAccountName: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsNumber()
  @IsNotEmpty()
  startingBalance: number;
}
