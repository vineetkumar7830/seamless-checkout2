import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class AddBillItemDto {
  @IsNotEmpty()
  billId: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitCost: number;
}
