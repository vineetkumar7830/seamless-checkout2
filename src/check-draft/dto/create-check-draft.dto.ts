import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCheckDraftDto {
  @IsString() checkFrom: string;
  @IsString() bankAccountId: string;
  @IsNumber() amount: number;
  @IsString() checkDate: string;
  @IsOptional() @IsString() payeeName?: string;
  @IsOptional() @IsString() checkDraftNo?: string;
  @IsOptional() @IsString() accountNoIfAny?: string;
  @IsOptional() @IsString() invoiceNoIfAny?: string;
  @IsOptional() @IsString() commentNote?: string;
  @IsOptional() @IsString() memo?: string;
  @IsBoolean() askPermission: boolean;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
}
