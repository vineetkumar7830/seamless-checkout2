import { IsString, IsIn } from 'class-validator';

export class ApplyBrandingDto {
  @IsString()
  companyId: string;

  @IsIn(['check', 'invoice'])
  type: 'check' | 'invoice';
}
