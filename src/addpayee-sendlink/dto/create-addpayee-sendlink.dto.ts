import {
  IsString,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateSendLinkDto {

  @IsIn(['customer', 'vendor', 'employee'])
  payeeType: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsBoolean()
  requestBankAccount: boolean;
}
    