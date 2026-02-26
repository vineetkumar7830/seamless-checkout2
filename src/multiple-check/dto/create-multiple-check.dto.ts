import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CheckItemDto {

  @IsMongoId()
  accountId: string;

  @IsMongoId()
  payeeId: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;
}

export class CreateMultipleCheckDto {

  @IsMongoId()
  selectBankAccount: string;

  @IsNumber()
  baseAmount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsMongoId()
  selectCategory?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckItemDto)
  checks: CheckItemDto[];
}