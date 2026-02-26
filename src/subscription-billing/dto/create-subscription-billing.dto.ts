import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionBillingDto {

  @IsString() @IsNotEmpty() firstName: string;
  @IsString() @IsNotEmpty() lastName: string;
  @IsString() @IsNotEmpty() companyName: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() address: string;
  @IsString() @IsNotEmpty() city: string;
  @IsString() @IsNotEmpty() state: string;
  @IsString() @IsNotEmpty() zip: string;
  @IsString() @IsNotEmpty() country: string;
}