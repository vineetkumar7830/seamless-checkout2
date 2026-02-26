import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class UpdateAddItemDto {

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  privateNote?: string;

  @IsOptional()
  @IsBoolean()
  trackProduct?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  isActive?: boolean;
}
