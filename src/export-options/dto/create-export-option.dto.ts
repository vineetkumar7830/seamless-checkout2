import { IsString, IsOptional, IsNumber, IsDateString, IsEmail } from 'class-validator';

export class CreateExportDto {

  @IsString()
  payeeName: string;

  @IsOptional()
  @IsEmail()
  payeeEmail?: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  currency?: string; 
}
