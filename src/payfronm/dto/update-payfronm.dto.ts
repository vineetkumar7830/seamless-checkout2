import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePayFromActionDto {

  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsIn(['send', 'print', 'direct-deposit'])
  action: string;
}
