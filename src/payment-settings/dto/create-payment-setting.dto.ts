import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreatePaymentSettingDto {

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsIn(['live', 'sandbox'])
  mode: 'live' | 'sandbox';
}
