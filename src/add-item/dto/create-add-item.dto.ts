import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateAddItemDto {

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  privateNote?: string;

  // ✅ MISSING FIELD (NOW ADDED)
  @IsBoolean()
  trackProduct: boolean;

  // ✅ MISSING FIELD (NOW ADDED)
  @IsNumber()
  @Min(0)
  stockQuantity: number;
}
