import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

/* ---------- PLAN ---------- */

class DynamicTextsDto {
  @IsOptional() @IsString() textLine1?: string;
  @IsOptional() @IsString() textLine2?: string;
  @IsOptional() @IsString() textLine3?: string;
  @IsOptional() @IsString() textLine4?: string;
  @IsOptional() @IsString() textLine5?: string;
  @IsOptional() @IsString() textLine6?: string;
}

class FeatureDynamicTextsDto {
  @IsOptional() @IsString() textLine1?: string;
  @IsOptional() @IsString() textLine2?: string;
  @IsOptional() @IsString() textLine3?: string;
  @IsOptional() @IsString() textLine4?: string;
  @IsOptional() @IsString() textLine5?: string;
}

class PlanFeatureDto {
  @IsString() featureName!: string;
  @IsString() featureCode!: string;
  @IsNumber() featureType!: number;
  @IsNumber() featureCategoryType!: number;
  @IsOptional() planFeatureTransactionFee?: any;
  @IsOptional() quantity?: any;
  @IsString() featureDisplayText!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => FeatureDynamicTextsDto)
  featureDynamicTexts!: FeatureDynamicTextsDto;
}

export class CreatePlanDto {
  @IsString() id!: string;
  @IsString() planName!: string;
  @IsString() planCode!: string;
  @IsString() planPrice!: string;
  @IsNumber() anchorPrice!: number;
  @IsString() monthlyPrice!: string;
  @IsString() billIntervalUnit!: string;
  @IsNumber() planCategoryType!: number;
  @IsString() planTransactionFee!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DynamicTextsDto)
  planDynamicTexts!: DynamicTextsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanFeatureDto)
  planFeatures!: PlanFeatureDto[];

  @IsOptional() @IsArray() freeAddonFeatures?: any[];
  @IsOptional() @IsNumber() freeCredit?: number;
}

/* ---------- ADDON ---------- */

export class CreateAddOnDto {
  @IsString() id!: string;
  @IsString() addonName!: string;
  @IsString() addonCode!: string;
  @IsString() addonDisplayText!: string;
  @IsString() price!: string;
  @IsOptional() anchorPrice?: any;
  @IsString() monthlyPrice!: string;
  @IsString() pricingScheme!: string;
  @IsString() unitName!: string;
  @IsString() addonType!: string;
  @IsString() intervalUnit!: string;
  @IsString() description!: string;
  @IsString() detailedDescription!: string;
  @IsNumber() addonQuantityType!: number;
  @IsNumber() addonCategoryType!: number;
  @IsOptional() featureCode?: any;
  @IsObject() addonDynamicTexts!: any;
}

/* ---------- PURCHASE ---------- */

export class PurchasePlanDto {
  @IsOptional() @IsString() companyId?: string;
  @IsString() planId!: string;
  @IsOptional() @IsArray() @IsString({ each: true }) addonIds?: string[];
}
