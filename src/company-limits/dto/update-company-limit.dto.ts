import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCompanyLimitDto {
  @IsOptional()
  @IsNumber()
  maxUsers?: number;

  @IsOptional()
  @IsNumber()
  monthlyCheckLimit?: number;

  @IsOptional()
  @IsNumber()
  invoiceVolumeLimit?: number;

}
