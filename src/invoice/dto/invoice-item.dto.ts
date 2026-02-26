import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class InvoiceItemDto {
  @Type(() => Number)
  @IsNumber()
  sn: number;

  @IsString()
  item: string;

  @IsString()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  qty: number;
  
  @Type(() => Number)
  @IsNumber()
  unitCost: number;

  @Type(() => Number)
  @IsNumber()
  discount?: number;

  @Type(() => Number)
  @IsNumber()
  total: number;

  @Type(() => Number)
  @IsNumber()
  discountAmount?: number;

  @Type(() => Number)
  @IsNumber()
  itemTotal: number;
}
