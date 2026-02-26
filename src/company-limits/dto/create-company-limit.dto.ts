import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCompanyLimitDto {
  @IsNotEmpty()
  companyId: string;

  @IsNumber()
  maxUsers: number;

  @IsNumber()
  monthlyCheckLimit: number;

  @IsNumber()
  invoiceVolumeLimit: number;
}
