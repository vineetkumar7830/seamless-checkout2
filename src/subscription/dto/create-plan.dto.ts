import { IsString, IsNumber, IsArray, IsIn, IsNotEmpty } from 'class-validator';

export class CreatePlanDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsIn(['monthly', 'yearly'])
  billingCycle: string;

  @IsArray()
  features: string[];
}
