import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  IsDateString,
} from 'class-validator';

export class CreateCheckIssuedDto {

  @IsString()
  @IsNotEmpty()
  payeeName: string;

  @IsOptional()
  payeeEmail?: string;

  @IsString()
  @IsNotEmpty()
  bankAccountName: string;

  @IsString()
  @IsNotEmpty()
  checkNumber: string;

  @IsDateString()
  checkDate: string;

  @IsNumber()
  amount: number;

  @IsIn(['USD', 'CAD'])
  currency: 'USD' | 'CAD';

  @IsOptional()
  memo?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  referenceId?: string;
  
}
