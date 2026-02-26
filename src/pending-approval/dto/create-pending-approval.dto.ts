import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateApprovalDto {

  @IsIn([
    'check-issued',
    'invoice-sent',
    'payment-received',
    'bill-payment',
  ])
  entityType: string;

  @IsString()
  @IsNotEmpty()
  entityId: string;
  
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  amount: number;
  

  @IsIn(['USD', 'CAD'])
  currency: 'USD' | 'CAD';

  @IsOptional()
  remarks?: string;
}
