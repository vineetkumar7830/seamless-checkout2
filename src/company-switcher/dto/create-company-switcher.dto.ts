import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCompanySwitcherDto {
  @IsString()
  companyId: string;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
