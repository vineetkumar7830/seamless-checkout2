import {
  IsString,
  IsDateString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class CashEntryDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  cashierClerk?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

class CheckEntryDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  checkNumber?: string;

  @IsOptional()
  @IsString()
  cashierClerk?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateDepositSlipDto {
  @IsString()
  bankAccountId: string;

  // ✅ UPDATED
  @IsOptional()
  @IsString()
  depositFromId?: string;

  @IsOptional()
  @IsString()
  depositFromName?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  refId?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsBoolean()
  blankDepositSlip: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CashEntryDto)
  cashEntries: CashEntryDto[];
  
   
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckEntryDto)
  checkEntries: CheckEntryDto[];
}
