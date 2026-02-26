import { IsString, IsNotEmpty } from 'class-validator';

export class AddBillCommentDto {

  @IsString()
  @IsNotEmpty()
  billId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
