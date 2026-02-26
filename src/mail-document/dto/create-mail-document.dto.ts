import {
  IsArray,
  ValidateNested,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecipientDto {

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsMongoId()
  from: string;

  @IsMongoId()
  payee: string;

  @IsString()
  shippingType: string;

  @Type(() => Number)
  @IsNumber()
  shippingPrice: number;
}

export class CreateMailDto {

  // ✅ ADDED
  @IsOptional()
  @IsMongoId()
  defaultFrom?: string;

  // ✅ ADDED
  @IsOptional()
  @IsString()
  defaultShippingType?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipientDto)
  recipients: RecipientDto[];
}
