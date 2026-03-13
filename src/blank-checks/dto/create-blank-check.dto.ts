import { IsMongoId, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateBlankCheckDto {

  @IsMongoId()
  bankAccountId: string;

  @IsNumber()
  @Min(1)
  numberOfChecks: number;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsBoolean()
  includeSignature?: boolean;

}