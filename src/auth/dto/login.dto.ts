import { IsEmail, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsObject()
  payee?: {
    payeeId: string;
    payeeName: string;
    payeeEmail: string;
  };
}
