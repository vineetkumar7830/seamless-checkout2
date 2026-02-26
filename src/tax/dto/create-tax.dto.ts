import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateTaxDto {
  @IsNotEmpty()
  @IsString()
  taxName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  taxPercent: number;

  @IsOptional()
  @IsString()
  note?: string;
}
