import { IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class CreateBankDto {

  @IsOptional()
  country?: 'USA' | 'CANADA';

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  addressLine2?: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  // ================= LOCATION =================

  @IsOptional()
  zip?: string;

  @IsOptional()
  postalCode?: string;

  // ================= BANK DETAILS ================= 

  // 🇺🇸 USA Routing Number → exactly 9 digits
  @ValidateIf(o => o.country === 'USA')
  @Matches(/^\d{9}$/, {
    message: 'USA routing number must be exactly 9 digits',
  })
  routingNumber?: string;

  // 🇨🇦 Canada Transit Number → exactly 5 digits
  @ValidateIf(o => o.country === 'CANADA')
  @Matches(/^\d{5}$/, {
    message: 'Canada transit number must be exactly 5 digits',
  })
  transitNumber?: string;

  // 🇨🇦 Canada Financial Institution No → exactly 3 digits
  @ValidateIf(o => o.country === 'CANADA')
  @Matches(/^\d{3}$/, {
    message: 'Financial institution number must be exactly 3 digits',
  })
  financialInstitutionNo?: string;

  // ================= ACCOUNT DETAILS =================

  // 🇺🇸 USA Account Number → 4–17 digits
  @ValidateIf(o => o.country === 'USA')
  @Matches(/^\d{4,17}$/, {
    message: 'USA account number must be between 4 and 17 digits',
  })

  // 🇨🇦 Canada Account Number → 7–12 digits
  @ValidateIf(o => o.country === 'CANADA')
  @Matches(/^\d{7,12}$/, {
    message: 'Canada account number must be between 7 and 12 digits',
  })
  accountNumber: string;

  @IsNotEmpty()
  nickName: string;

  @IsNotEmpty()
  accountType: string;

  @IsOptional()
  bankName?: string;

  @IsOptional()
  bankStreetAddress?: string;

  @IsOptional()
  bankCity?: string;

  @IsOptional()
  bankState?: string;

  @IsOptional()
  bankZip?: string;

  @IsOptional()
  bankPostalCode?: string;

  @IsOptional()
  checkNumber?: string;

  @IsOptional()
  @IsString()
  signatureUrl?: string;
}