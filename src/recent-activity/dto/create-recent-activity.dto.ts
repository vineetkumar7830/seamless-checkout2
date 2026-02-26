import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum ActivityType {
  CHECK_CREATED = 'CHECK_CREATED',
  INVOICE_SENT = 'INVOICE_SENT',
  USER_ACTION = 'USER_ACTION',
}

export class CreateRecentActivityDto {
  @IsEnum(ActivityType)
  type: ActivityType; 

  @IsString()
  title: string; 

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  referenceId?: string; 
  // invoiceId /Id / etc
}
